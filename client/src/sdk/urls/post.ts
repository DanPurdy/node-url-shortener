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

export async function postUrl(url: string) {
  return await apiClient<IPostUrlRequestFormat, IPostUrlResponseFormat>(
    'POST',
    ENDPOINT,
    {
      url,
    },
  );
}
