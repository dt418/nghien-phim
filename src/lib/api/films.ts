'use server'

import slugify from 'slugify'

import type { CategoryResponse } from '~/types/category'
import type { FilmByCountryResponse } from '~/types/film-by-country'
import type { FilmByYearResponse } from '~/types/film-by-year'
import type { FilmListResponse } from '~/types/list'
import type { MovieResponse } from '~/types/movie'
import type { MovieListResponse } from '~/types/movie-list'
import type { MovieSearchListResponse } from '~/types/search'

import { API_CONFIG, createFilmsUrl } from './config'
import { fetchWithErrorHandling } from './fetch'

/**
 * Creates a handler for paginated film endpoints
 * @param path - The endpoint path segment
 * @returns A function that handles paginated requests for the specified path
 */
function createPaginatedHandler<T extends MovieListResponse>(path: string) {
  return async (param: string, page = 1): Promise<T> => fetchWithErrorHandling<T>(
    createFilmsUrl(`/${path}/${param}?page=${page}`),
  )
}

/**
 * Fetches a paginated list of recently updated films
 *
 * @param page - The page number to fetch (starting from 1)
 * @returns Promise resolving to film list data
 * @throws APIError if the request fails
 *
 * @example
 * ```typescript
 * try {
 *   const films = await getFilms(1);
 *   console.log(films.data); // Array of film data
 * } catch (error) {
 *   if (error instanceof APIError) {
 *     console.error('API Error:', error.message);
 *   }
 * }
 * ```
 */
export async function getFilms(page: number): Promise<MovieListResponse> {
  return fetchWithErrorHandling<MovieListResponse>(
    createFilmsUrl(`/phim-moi-cap-nhat?page=${page}`),
  )
}

/**
 * Fetches detailed information for a specific film
 *
 * @param slug - The film's unique identifier (string or array of strings)
 * @returns Promise resolving to detailed film data
 * @throws APIError if the request fails
 *
 * @example
 * ```typescript
 * try {
 *   const film = await getFilmBySlug('spider-man-2023');
 *   console.log(film.title); // Film title
 *   console.log(film.description); // Film description
 * } catch (error) {
 *   if (error instanceof APIError) {
 *     console.error('API Error:', error.message);
 *   }
 * }
 * ```
 */
export async function getFilmBySlug(slug: string | string[]): Promise<MovieResponse> {
  // SSRF mitigation: Only allow slugs that are alphanumeric, hyphens, or underscores
  const slugStr = Array.isArray(slug) ? slug.join('-') : slug;
  if (!/^[a-zA-Z0-9-_]+$/.test(slugStr)) {
    throw new Error('Invalid slug format');
  }
  return fetchWithErrorHandling<MovieResponse>(
    `${API_CONFIG.BASE_URL}${API_CONFIG.FILM_PATH}/${slugStr}`,
  )
}

/**
 * Searches for films using a keyword
 *
 * @param keyword - Search term to find films
 * @returns Promise resolving to search results
 * @throws APIError if the request fails
 *
 * @example
 * ```typescript
 * try {
 *   const results = await searchFilms('spider man');
 *   console.log(results.data); // Array of matching films
 *   console.log(results.total); // Total number of results
 * } catch (error) {
 *   if (error instanceof APIError) {
 *     console.error('API Error:', error.message);
 *   }
 * }
 * ```
 */
export async function searchFilms(keyword: string): Promise<MovieSearchListResponse> {
  const searchTerm = slugify(keyword, {
    locale: 'vi',
    lower: true,
    replacement: '-',
  })
  return fetchWithErrorHandling<MovieSearchListResponse>(
    createFilmsUrl(`/search?keyword=${searchTerm}`),
  )
}

// Create handlers for different film filtering options

/**
 * Fetches films by release year
 *
 * @example
 * ```typescript
 * try {
 *   const films = await getFilmByYear('2023', 1);
 *   console.log(films.data); // Films released in 2023
 * } catch (error) {
 *   if (error instanceof APIError) {
 *     console.error('API Error:', error.message);
 *   }
 * }
 * ```
 */
export const getFilmByYear
  = createPaginatedHandler<FilmByYearResponse>('nam-phat-hanh')

/**
 * Fetches films by country of origin
 *
 * @example
 * ```typescript
 * try {
 *   const films = await getFilmByCountry('au-my', 1);
 *   console.log(films.data); // American/Australian films
 * } catch (error) {
 *   if (error instanceof APIError) {
 *     console.error('API Error:', error.message);
 *   }
 * }
 * ```
 */
export const getFilmByCountry
  = createPaginatedHandler<FilmByCountryResponse>('quoc-gia')

/**
 * Fetches films by category/genre
 *
 * @example
 * ```typescript
 * try {
 *   const films = await getFilmByCategory('hanh-dong', 1);
 *   console.log(films.data); // Action films
 * } catch (error) {
 *   if (error instanceof APIError) {
 *     console.error('API Error:', error.message);
 *   }
 * }
 * ```
 */
export const getFilmByCategory
  = createPaginatedHandler<CategoryResponse>('the-loai')

/**
 * Creates a paginated handler for retrieving a list of films by category.
 *
 * @param param - The category to fetch films from
 * @param page - The page number to fetch (starting from 1)
 * @param options - Optional fetch options
 * @returns A paginated handler function that returns a Promise of IFilmListResponse
 *
 * @example
 * ```typescript
 * // Getting the first page of films with 10 items per page
 * const response = await getFilmListByCategory('phim-dang-chieu', 1, { cache: 'force-cache' });
 * ```
 */
export async function getFilmListByCategory(
  param: string,
  page = 1,
  options?: RequestInit,
): Promise<FilmListResponse> {
  return fetchWithErrorHandling<FilmListResponse>(
    createFilmsUrl(`/${'danh-sach'}/${param}?page=${page}`),
    options,
  )
}
