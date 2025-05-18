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
  // Log the baseUrl being used
  console.log(`[apiServerFetch] Using NEXT_PUBLIC_API_URL: ${baseUrl}`);

  if (!baseUrl) {
    console.error('[apiServerFetch] CRITICAL: Missing NEXT_PUBLIC_API_URL environment variable.');
    throw new Error(
      'Missing NEXT_PUBLIC_API_URL environment variable. This is required to make API calls.'
    );
  }

  const fullUrl = `${baseUrl}${path}`;
  console.log(`[apiServerFetch] Attempting to fetch: ${fullUrl}`); // Log the full URL

  try {
    const response = await fetch(fullUrl, {
      headers,
      body: requestOptions.body,
      ...requestOptions,
    });

    // Log status and whether it's ok
    console.log(`[apiServerFetch] Response status for ${fullUrl}: ${response.status}, ok: ${response.ok}`);

    if (!response.ok) {
      // Attempt to log the response body if it's not ok, might give clues
      try {
        const errorBody = await response.text(); // or response.json() if you expect JSON
        console.error(`[apiServerFetch] Error response body for ${fullUrl}:`, errorBody);
      } catch (e) {
        console.error(`[apiServerFetch] Could not parse error response body for ${fullUrl}.`);
      }
    }
    return response;
  } catch (error) {
    console.error(`[apiServerFetch] Network or other error fetching ${fullUrl}:`, error);
    throw error; // Re-throw the original error
  }
};
