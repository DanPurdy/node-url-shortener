import CounterModel from '../models/counter.model';
import UrlModel from '../models/url.model';
import convertBase36 from './convertBase36';
import padString from './padString';

const possiblyCreateRecord = async function (url: string): Promise<{
  _id: string;
  longUrl: string;
  shortUrl: string;
  exists: boolean;
}> {
  const existingUrl = await UrlModel.findOne(
    { longUrl: url },
    'longUrl shortUrl',
  );

  if (existingUrl) {
    return {
      exists: true,
      _id: existingUrl._id,
      shortUrl: existingUrl.shortUrl,
      longUrl: existingUrl.longUrl,
    };
  }

  const counter = await CounterModel.findOne({});

  if (!counter?.count) {
    throw new Error('missing count');
  }

  const newUrl = new UrlModel({
    longUrl: url,
    shortUrl: padString(convertBase36(counter.count), 8, '0'), // 8 characters set here for padding - in real life app this wouldn't be needed
  });

  const { shortUrl, longUrl, _id } = await newUrl.save();

  return { exists: false, shortUrl, longUrl, _id };
};

export default possiblyCreateRecord;
