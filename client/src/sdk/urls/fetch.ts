import apiClient from '../apiClient';
import { ENDPOINT } from './routeConfig';

export interface IUrlItem {
  _id: string;
  longUrl: string;
  shortUrl: string;
}

interface IFetchUrlsResponseFormat {
  items: IUrlItem[];
}

export const METHOD = 'GET';

export async function fetchUrls(): Promise<IFetchUrlsResponseFormat> {
  return await apiClient<unknown, IFetchUrlsResponseFormat>(
    METHOD,
    ENDPOINT,
    {},
  );
}
