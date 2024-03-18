import React from "react";

import { IMovieBase } from "@/types/movie-list";

import { FilmCard } from "./film.card";

interface IFilmListProps {
  items: IMovieBase[];
}
export default function FilmList({ items }: IFilmListProps) {
  return (
    <ul className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 place-items-center">
      {items?.map((filmItem: IMovieBase) => {
        return (
          <li key={filmItem.slug} className="w-full">
            <FilmCard {...filmItem} />
          </li>
        );
      })}
    </ul>
  );
}
