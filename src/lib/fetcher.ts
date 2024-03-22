"use server";

import { IMovieResponse } from "@/types/movie";
import { IMovieListResponse } from "@/types/movie-list";

export async function getFilms(page: number): Promise<IMovieListResponse> {
  try {
    const res = await fetch(
      `https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=${page}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch film list. Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching film list: ${error}`);
  }
}

export async function getFilmBySlug(
  slug: string | string[]
): Promise<IMovieResponse> {
  try {
    const res = await fetch(`https://phim.nguonc.com/api/film/${slug}`);

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch film item");
    }

    const data: IMovieResponse = await res.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching film by slug: ${error}`);
  }
}
