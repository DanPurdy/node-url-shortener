import apiClient from '../../apiClient';
import { postUrl, METHOD } from '../post';
import { ENDPOINT } from '../routeConfig';

jest.mock('../../apiClient', () => jest.fn());

describe('urls', () => {
  const apiClientMock = apiClient as jest.MockedFunction<typeof apiClient>;

  it('should pass the correct properties to the apiClient', () => {
    apiClientMock.mockResolvedValue({});
    const mockUrl = 'https://example.com';

    postUrl(mockUrl);

    expect(apiClientMock).toHaveBeenCalledTimes(1);
    expect(apiClientMock).toHaveBeenCalledWith(METHOD, ENDPOINT, {
      url: mockUrl,
    });
  });
});
