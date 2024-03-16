"use server";

import { IMovieResponse } from "@/types/movie";
import { IMovieListResponse } from "@/types/movie-list";

export async function getFilms(page: number): Promise<IMovieListResponse> {
  const res = await fetch(
    `https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=${page}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const data = await res.json();

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch film list");
  }

  return data;
}

export async function getFilmBySlug(
  slug: string | string[]
): Promise<IMovieResponse> {
  const res = await fetch(`https://phim.nguonc.com/api/film/${slug}`);
  const data: IMovieResponse = await res.json();
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch film item");
  }

  return data;
}
