/**
 * API configuration constants
 */
export const API_CONFIG = {
  BASE_URL: 'https://phim.nguonc.com/api',
  FILM_PATH: '/film',
  FILMS_PATH: '/films',
} as const

/**
 * Creates a URL for the films API endpoint
 */
export function createFilmsUrl(path: string) {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.FILMS_PATH}${path}`
}
