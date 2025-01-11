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

    if (!res.ok) {
      throw new APIError(`HTTP error ${res.status}`, res.status, url);
    }

    return res.json();
  } catch (error) {
    console.error(`API request failed: ${url}`, error);
    throw error instanceof APIError
      ? error
      : new APIError('Network error', undefined, url);
  }
}
