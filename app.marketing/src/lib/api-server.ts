export const apiServerFetch = async (
  path: string,
  requestOptions: RequestInit = {}
) => {
  const headers: Record<string, string> = (requestOptions.headers as Record<
    string,
    string
  >) || {
    'Content-Type': 'application/json',
  };

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error(
      'Missing NEXT_PUBLIC_API_URL environment variable. This is required to make API calls.'
    );
  }

  return fetch(`${baseUrl}${path}`, {
    headers,
    body: requestOptions.body,
    ...requestOptions,
  });
};
