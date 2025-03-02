import React from 'react';

import { TMovieItemShortened } from '@/types/movie-list';

import { FilmCard } from './film.card';

interface IFilmListProps {
  items: TMovieItemShortened[];
}
export function FilmList({ items }: IFilmListProps) {
  return (
    <ul className="grid w-full grid-cols-2 gap-x-3 gap-y-4 sm:md:grid-cols-3 md:grid-cols-4 md:gap-x-4 lg:grid-cols-4 xl:grid-cols-5">
      {items?.map((filmItem: TMovieItemShortened, index) => {
        return (
          <li key={filmItem.slug} className="w-full">
            <FilmCard {...filmItem} isPriority={index < 4} />
          </li>
        );
      })}
    </ul>
  );
}
