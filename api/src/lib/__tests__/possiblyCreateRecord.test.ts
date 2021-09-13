import possiblyCreateRecord from '../possiblyCreateRecord';
import { connect, closeDatabase, clearDatabase } from '../../test-db-handler';
import CounterModel from '../../models/counter.model';
import padString from '../padString';
import convertBase36 from '../convertBase36';
import UrlModel, { COUNT_OFFSET } from '../../models/url.model';

describe('possiblyCreateRecord', () => {
  beforeAll(async () => await connect());
  afterEach(async () => await clearDatabase());
  afterAll(async () => await closeDatabase());

  it('should throw when no counter record is defined', async () => {
    await expect(possiblyCreateRecord('https://test.com')).rejects.toThrow(
      Error('missing count'),
    );
  });

  it('should return a new record with exists false when none exists currently and save to the db', async () => {
    const expectedCount = 1;
    const testUrl = 'https://test.com';
    const counter = new CounterModel({
      _id: 'count',
      count: expectedCount,
    });

    await counter.save();

    const result = await possiblyCreateRecord(testUrl);

    expect(result.exists).toBe(false);
    expect(result.longUrl).toBe(testUrl);
    expect(result.shortUrl).toBe(
      padString(convertBase36(expectedCount), 8, '0'),
    );
    expect(result._id).toBeDefined();

    const url = await UrlModel.findById(result._id);

    expect(url?.longUrl).toBe(testUrl);
  });

  it('should return an existing record with exists true when it already exists in the db', async () => {
    const expectedCount = 1;
    const expectedShortUrl = padString(convertBase36(expectedCount), 8, '0');
    const testUrl = 'https://test.com';
    const counter = new CounterModel({
      _id: 'count',
      count: expectedCount,
    });
    await counter.save();

    const url = new UrlModel({
      longUrl: `${testUrl}`,
      shortUrl: expectedShortUrl,
    });

    await url.save();

    const result = await possiblyCreateRecord(testUrl);

    expect(result.exists).toBe(true);
    expect(result.longUrl).toBe(testUrl);
    expect(result.shortUrl).toBe(expectedShortUrl);
    expect(result._id).toBeDefined();
  });
});
