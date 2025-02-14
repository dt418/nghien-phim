import { APIError } from './errors';

/**
 * Generic fetch wrapper for API calls with error handling
 */
export async function fetchWithErrorHandling<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const res = await fetch(url, {
      method: 'GET',
      ...options,
    });

    // Handle non-JSON responses
    const contentType = res.headers.get('content-type');
    const data = contentType?.includes('application/json')
      ? await res.json()
      : await res.text();

    if (!res.ok) {
      // Handle API error responses with proper message
      const defaultError = `Request failed with status ${res.status}`;
      const stringError = typeof data === 'string' ? data : defaultError;
      const errorMessage =
        typeof data === 'object' && data.message ? data.message : stringError;

      throw new APIError(errorMessage, res.status, url);
    }

    return data as T;
  } catch (error) {
    // Improve error logging and handling
    if (error instanceof APIError) {
      console.error(`API Error: ${error.message}`, {
        status: error.status,
      });
      throw error;
    }

    // Handle network/other errors
    console.error(`Network/Request Error for ${url}:`, error);
    throw new APIError(
      error instanceof Error ? error.message : 'Network error',
      undefined,
      url
    );
  }
}
