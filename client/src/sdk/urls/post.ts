import apiClient from '../apiClient';
import { ENDPOINT } from './routeConfig';

interface IPostUrlRequestFormat {
  url: string;
}

interface IPostUrlResponseFormat {
  _id: string;
  longUrl: string;
  shortUrl: string;
}

export const METHOD = 'POST';

export async function postUrl(url: string): Promise<IPostUrlResponseFormat> {
  return await apiClient<IPostUrlRequestFormat, IPostUrlResponseFormat>(
    METHOD,
    ENDPOINT,
    {
      url,
    },
  );
}
