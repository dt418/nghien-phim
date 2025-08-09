import { APIError } from './errors'

/**
 * Enhanced fetch wrapper for API calls with error handling, automatic retries and caching
 */
export async function fetchWithErrorHandling<T>(
  url: string,
  options?: RequestInit & { retries?: number },
): Promise<T> {
  const { retries = 2, ...fetchOptions } = options || {}
  let attempt = 0

  const performFetch = async (): Promise<T> => {
    attempt++
    try {
      const res = await fetch(url, {
        method: 'GET',
        next: { revalidate: 3600 }, // Cache for 1 hour by default
        ...fetchOptions,
      })

      // Handle non-JSON responses
      const contentType = res.headers.get('content-type')
      const data = contentType?.includes('application/json')
        ? await res.json()
        : await res.text()

      if (!res.ok) {
        // Handle API error responses with proper message
        const defaultError = `Request failed with status ${res.status}`
        const stringError = typeof data === 'string' ? data : defaultError
        const errorMessage
          = typeof data === 'object' && data.message ? data.message : stringError

        throw new APIError(errorMessage, res.status, url)
      }

      return data as T
    }
    catch (error) {
      // Handle potential retry for network errors or specific status codes
      if (
        attempt <= retries
        && (!(error instanceof APIError) || (error.status && [408, 429, 500, 502, 503, 504].includes(error.status)))
      ) {
        // Exponential backoff
        const delay = Math.min(2 ** attempt * 100, 5000)
        console.error(`Retrying request to ${url} (attempt ${attempt}/${retries}) after ${delay}ms`)
        await new Promise(resolve => setTimeout(resolve, delay))
        return performFetch()
      }

      // Improve error logging and handling
      if (error instanceof APIError) {
        console.error(`API Error: ${error.message}`, {
          status: error.status,
          url,
          attempt,
        })
        throw error
      }

      // Handle network/other errors
      console.error('Network/Request Error for %s:', url, error, { attempt })
      throw new APIError(
        error instanceof Error ? error.message : 'Network error',
        undefined,
        url,
      )
    }
  }

  return performFetch()
}
