import express, { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import validUrl from 'valid-url';
import convertBase36 from '../../lib/convertBase36';
import padString from '../../lib/padString';
import CounterModel from '../../models/counter.model';
import UrlModel from '../../models/url.model';

const router = express.Router();

// TODO error handling

// TODO env var
const DEFAULT_URL = 'https://pbid.io/';

/**
 * @api {get} /api/url GET /api/url
 * @apiName listUrls
 * @apiGroup urls
 *
 * @apiDescription get a list of shortUrls and their respective longUrls
 *
 * @apiSuccess {Array} items
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Success
 *     {
 *       "items": [
 *        {
 *          _id: string,
 *          shortUrl: string,
 *          longUrl: string,
 *        }
 *      ]
 *    }
 */
router.get(
  '/',
  (req: Request<core.ParamsDictionary, {}, {}, { limit: number }>, res) => {
    Promise.resolve().then(async () => {
      // const { limit } = req.query;

      const docs = await UrlModel.find({}, 'longUrl shortUrl').sort({
        createdAt: -1,
      });

      return res.status(200).json({
        items: docs.map((doc) => ({
          ...doc.toJSON(),
          shortUrl: `${DEFAULT_URL}${doc.shortUrl}`,
        })),
      });
    });
  },
);

/**
 * @api {post} /api/url POST /api/url
 * @apiName postUrl
 * @apiGroup urls
 *
 * @apiDescription post a url to be shortened
 *
 * @apiParam {string} url
 *
 * @apiSuccess {string} code
 * @apiSuccess {string} longUrl
 * @apiSuccess {string} shortUrl
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Success
 *     {
 *       _id: string,
 *       shortUrl: string,
 *       longUrl: string,
 *     }
 *
 * @apiFailureExample Failure-Response:
 *    HTTP/1.1 422 Bad Request
 *   {
 *    "code": "INVALID_URL",
 *    "message": "The url was invalid",
 *   }
 */
router.post('/', (req: Request<{}, {}, { url: string }>, res) => {
  Promise.resolve().then(async () => {
    const { url } = req.body;

    if (typeof url !== 'string' || !validUrl.isWebUri(url)) {
      // TODO format as error codes
      return res.status(422).send({
        code: 'INVALID_URL',
        message: 'The url was invalid',
      });
    }

    const counter = await CounterModel.findOne({});
    const existingUrl = await UrlModel.findOne(
      { longUrl: url },
      'longUrl, shortUrl',
    );

    if (!existingUrl) {
      if (!counter?.count) {
        throw new Error('missing count');
      }

      const newUrl = new UrlModel({
        longUrl: url,
        shortUrl: padString(convertBase36(counter.count), 8, '0'), // TODO move the character count to env vars
      });

      const { shortUrl, longUrl, _id } = await newUrl.save();

      return res.status(201).send({
        longUrl,
        _id,
        shortUrl: `${DEFAULT_URL}${shortUrl}`,
      });
    }

    res.status(200).send({
      ...existingUrl.toJSON(),
      shortUrl: `${DEFAULT_URL}${existingUrl.shortUrl}`,
    });
  });
});

export default router;
