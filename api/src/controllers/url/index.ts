import express, { Request, Response } from 'express';
import validUrl from 'valid-url';
import possiblyCreateRecord from '../../lib/possiblyCreateRecord';
import UrlModel from '../../models/url.model';

const router = express.Router();

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
router.get('/', (req: Request, res) => {
  Promise.resolve()
    .then(async () => {
      const docs = await UrlModel.find({}, 'longUrl shortUrl').sort({
        createdAt: -1,
      });

      return res.status(200).json({
        items: docs.map((doc) => ({
          ...doc.toJSON(),
          shortUrl: `${DEFAULT_URL}${doc.shortUrl}`,
        })),
      });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

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
  Promise.resolve()
    .then(async () => {
      const { url } = req.body;

      if (typeof url !== 'string' || !validUrl.isWebUri(url)) {
        // TODO format as error codes
        return res.status(422).send({
          code: 'INVALID_URL',
          message: 'The url was invalid',
        });
      }

      // The client shouldn't care that we already have the url in the system
      // it should behave the same way to the user but just not duplicate the records
      const { exists, longUrl, shortUrl, _id } = await possiblyCreateRecord(
        url,
      );
      let statusCode = 201;

      if (exists) {
        statusCode = 200;
      }

      res.status(statusCode).send({
        _id,
        longUrl,
        shortUrl: `${DEFAULT_URL}${shortUrl}`,
      });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

export default router;
