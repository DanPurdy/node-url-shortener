export interface UrlError extends Error {
  status?: number;
  body?: {
    code: string;
    message: string;
  };
}

const errorCodes = {
  INVALID_URL: 'The url you entered was invalid, please try again',
} as { [key: string]: string };

export default errorCodes;
