'use server'

import type { ICategoryResponse } from '~/types/category'

import type { IFilmByCountryResponse } from '~/types/film-by-country'
import type { IFilmByYearResponse } from '~/types/film-by-year'
import type { IFilmListResponse } from '~/types/list'
import type { IMovieResponse } from '~/types/movie'
import type { IMovieListResponse } from '~/types/movie-list'
import type { IMovieSearchListResponse } from '~/types/search'
import slugify from 'slugify'

import { API_CONFIG, createFilmsUrl } from './config'
import { fetchWithErrorHandling } from './fetch'

/**
 * Creates a handler for paginated film endpoints
 * @param path - The endpoint path segment
 * @returns A function that handles paginated requests for the specified path
 */
function createPaginatedHandler<T extends IMovieListResponse>(path: string) {
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
export async function getFilms(page: number): Promise<IMovieListResponse> {
  return fetchWithErrorHandling<IMovieListResponse>(
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
export async function getFilmBySlug(slug: string | string[]): Promise<IMovieResponse> {
  return fetchWithErrorHandling<IMovieResponse>(
    `${API_CONFIG.BASE_URL}${API_CONFIG.FILM_PATH}/${slug}`,
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
export async function searchFilms(keyword: string): Promise<IMovieSearchListResponse> {
  const searchTerm = slugify(keyword, {
    locale: 'vi',
    lower: true,
    replacement: '-',
  })
  return fetchWithErrorHandling<IMovieSearchListResponse>(
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
  = createPaginatedHandler<IFilmByYearResponse>('nam-phat-hanh')

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
  = createPaginatedHandler<IFilmByCountryResponse>('quoc-gia')

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
  = createPaginatedHandler<ICategoryResponse>('the-loai')

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
): Promise<IFilmListResponse> {
  return fetchWithErrorHandling<IFilmListResponse>(
    createFilmsUrl(`/${'danh-sach'}/${param}?page=${page}`),
    options,
  )
}
