import React from "react";

import { IMovieBase } from "@/types/movie-list";

import { FilmCard } from "./film.card";

interface IFilmListProps {
  items: IMovieBase[];
}
export function FilmList({ items }: IFilmListProps) {
  return (
    <ul className="w-full grid grid-cols-2 gap-x-3 md:gap-x-4 gap-y-4 sm:md:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
      {items?.map((filmItem: IMovieBase, index) => {
        return (
          <li key={filmItem.slug} className="w-full">
            <FilmCard {...filmItem} isPriority={index < 4} />
          </li>
        );
      })}
    </ul>
  );
}
