/**
 * API configuration constants
 */
export const API_CONFIG = {
  BASE_URL: 'https://phim.nguonc.com/api',
  FILMS_PATH: '/films',
  FILM_PATH: '/film',
} as const;

/**
 * Creates a URL for the films API endpoint
 */
export const createFilmsUrl = (path: string) =>
  `${API_CONFIG.BASE_URL}${API_CONFIG.FILMS_PATH}${path}`;
