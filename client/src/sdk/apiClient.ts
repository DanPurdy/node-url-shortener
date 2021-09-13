// TODO update and move to env vars
const BASE_URL = 'http://localhost:4000/api';

export default async function apiClient<T, R>(
  method = 'GET',
  url: string,
  body: T,
): Promise<R> {
  return await fetch(`${BASE_URL}${url}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method,
    body: method === 'POST' ? JSON.stringify(body) : undefined,
  }).then(async (res) => {
    if (res.ok) {
      return res.json();
    }

    throw {
      status: res.status,
      body: await res.json(),
    };
  });
}
