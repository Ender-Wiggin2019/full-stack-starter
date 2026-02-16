const BASE_URL = 'http://localhost:3000/api';

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

async function request<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const { body, headers, ...rest } = options;

  const res = await fetch(`${BASE_URL}${url}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

export const get = <T>(url: string, options?: RequestOptions) =>
  request<T>(url, { ...options, method: 'GET' });

export const post = <T>(url: string, body?: unknown, options?: RequestOptions) =>
  request<T>(url, { ...options, method: 'POST', body });

export const put = <T>(url: string, body?: unknown, options?: RequestOptions) =>
  request<T>(url, { ...options, method: 'PUT', body });

export const patch = <T>(url: string, body?: unknown, options?: RequestOptions) =>
  request<T>(url, { ...options, method: 'PATCH', body });

export const del = <T>(url: string, options?: RequestOptions) =>
  request<T>(url, { ...options, method: 'DELETE' });
