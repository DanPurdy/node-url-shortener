import apiClient from '../../apiClient';
import { fetchUrls, METHOD } from '../fetch';
import { ENDPOINT } from '../routeConfig';

jest.mock('../../apiClient', () => jest.fn());

describe('urls', () => {
  const apiClientMock = apiClient as jest.MockedFunction<typeof apiClient>;

  it('should pass the correct properties to the apiClient', () => {
    apiClientMock.mockResolvedValue({});

    fetchUrls();

    expect(apiClientMock).toHaveBeenCalledTimes(1);
    expect(apiClientMock).toHaveBeenCalledWith(METHOD, ENDPOINT, {});
  });
});
