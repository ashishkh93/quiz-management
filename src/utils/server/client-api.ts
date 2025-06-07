import { signOut } from 'src/auth/context/jwt';

interface ApiClientConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: Record<string, any>;
  headers?: Record<string, string>;
}

export const apiClient = async (
  endpoint: string,
  { method = 'GET', data, headers = {} }: ApiClientConfig = {}
) => {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (data && method !== 'GET') {
    config.body = JSON.stringify(data);
  }

  // Add query string for GET requests
  let url = endpoint;
  if (data && method === 'GET') {
    const queryString = new URLSearchParams(data).toString();
    url = `${endpoint}?${queryString}`;
  }

  const res = await fetch(url, config);

  // window.location.href = window.location.origin + routes.SIGNOUT.url;

  const responseData = await res.json();

  if (responseData?.statusCode === 401) {
    // window.location.href = window.location.origin + paths.auth.jwt.signIn;
    signOut()
  }

  return responseData;
};
