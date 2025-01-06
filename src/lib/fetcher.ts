'use server';

import slugify from 'slugify';

import type { IMovieResponse } from '@/types/movie';
import type {
  IMovieListResponse,
  IMovieSearchListResponse,
} from '@/types/movie-list';

/**
 * Fetches a paginated list of recently updated films.
 * Makes a GET request to the films API endpoint with specified page number.
 *
 * @param page - The page number to fetch (starting from 1)
 * @returns Promise that resolves to IMovieListResponse object if successful, undefined if request fails
 *
 * @throws Will not throw errors - catches and returns undefined instead
 *
 * @example
 * ```typescript
 * const films = await getFilms(1);
 * if (films) {
 *   // handle films data
 * }
 * ```
 */
export async function getFilms(
  page: number
): Promise<IMovieListResponse | undefined> {
  try {
    // Fetch films with no-store cache policy to always get fresh data
    const res = await fetch(
      `https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=${page}`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      // Log error and return undefined if request fails
      console.error(`Failed to fetch film list. Status: ${res.status}`);
      return undefined;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching film list: ${error}`);
    return undefined;
  }
}

/**
 * Fetches film details by its slug identifier.
 * Makes a GET request to the film API endpoint.
 *
 * @param slug - The slug identifier for the film (string or array of strings)
 * @returns Promise that resolves to IMovieResponse object if successful, undefined if request fails
 *
 * @throws Will not throw errors - catches and returns undefined instead
 *
 * @example
 * ```typescript
 * const film = await getFilmBySlug("spider-man-2023");
 * if (film) {
 *   // handle film data
 * }
 * ```
 */
export async function getFilmBySlug(
  slug: string | string[]
): Promise<IMovieResponse | undefined> {
  try {
    const res = await fetch(`https://phim.nguonc.com/api/film/${slug}`);

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      console.error('Failed to fetch film item');
      return undefined;
    }

    const data: IMovieResponse = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching film by slug: ${error}`);
    return undefined;
  }
}

/**
 * Searches for films based on a given keyword.
 * Makes a GET request to the films search API endpoint.
 *
 * @param keyword - The search term to query films
 * @returns Promise that resolves to IMovieListResponse object if successful, undefined if request fails
 *
 * @throws Will not throw errors - catches and returns undefined instead
 *
 * @example
 * ```typescript
 * const results = await searchFilms("spider man");
 * if (results) {
 *   // handle search results
 * }
 * ```
 */
export async function searchFilms(
  keyword: string
): Promise<IMovieSearchListResponse | undefined> {
  try {
    const searchTerm = slugify(keyword, {
      locale: 'vi',
      lower: true,
      replacement: '-',
    });

    const res = await fetch(
      `https://phim.nguonc.com/api/films/search?keyword=${searchTerm}`
    );

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      console.error('Failed to fetch film item');
      return undefined;
    }

    const data: IMovieSearchListResponse = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching film by slug: ${error}`);
    return undefined;
  }
}

/**
 * Fetches a list of films for a specific year from the API.
 *
 * @param year - The year to fetch films for
 * @param page - The page number for pagination (defaults to 1)
 * @returns Promise that resolves to an IMovieListResponse object or undefined if the request fails
 *
 * @throws Will not throw errors, returns undefined instead
 *
 * @example
 * ```ts
 * const movies = await getFilmByYear('2023', 1);
 * ```
 */
export async function getFilmByYear(
  year: string,
  page = 1
): Promise<IMovieListResponse | undefined> {
  try {
    const res = await fetch(
      `https://phim.nguonc.com/api/films/nam-phat-hanh/${year}&page=${page}`
    );

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      console.error('Failed to fetch film item');
      return undefined;
    }

    const data: IMovieListResponse = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching film by year: ${error}`);
    return undefined;
  }
}

/**
 * Fetches a list of films from a specific country
 *
 * @param country - The country code/name to fetch films from
 * @param page - The page number for pagination (defaults to 1)
 * @returns Promise resolving to film list response or undefined if fetch fails
 *
 * @throws Will not throw errors, returns undefined instead
 *
 * @example
 * ```ts
 * const films = await getFilmByCountry('au-my', 1);
 * if(films) {
 *   // handle films data
 * }
 * ```
 */
export async function getFilmByCountry(
  country: string,
  page = 1
): Promise<IMovieListResponse | undefined> {
  try {
    const res = await fetch(
      `https://phim.nguonc.com/api/films/quoc-gia/${country}&page=${page}`
    );

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      console.error('Failed to fetch film item');
      return undefined;
    }

    const data: IMovieListResponse = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching film by country: ${error}`);
    return undefined;
  }
}

export async function getFilmByCategory(
  category: string,
  page = 1
): Promise<IMovieListResponse | undefined> {
  try {
    const res = await fetch(
      `https://phim.nguonc.com/api/films/the-loai/${category}&page=${page}`
    );

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      console.error('Failed to fetch film item');
      return undefined;
    }

    const data: IMovieListResponse = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching film by category: ${error}`);
    return undefined;
  }
}
