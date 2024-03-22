"use server";

import { IMovieResponse } from "@/types/movie";
import { IMovieListResponse } from "@/types/movie-list";

export async function getFilms(
  page: number
): Promise<IMovieListResponse | undefined> {
  try {
    const res = await fetch(
      `https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=${page}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!res.ok) {
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

export async function getFilmBySlug(
  slug: string | string[]
): Promise<IMovieResponse | undefined> {
  try {
    const res = await fetch(`https://phim.nguonc.com/api/film/${slug}`);

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      console.error("Failed to fetch film item");
      return undefined;
    }

    const data: IMovieResponse = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching film by slug: ${error}`);
    return undefined;
  }
}
