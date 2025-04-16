import React from 'react'

import type { MovieItemShortened } from '~/types/movie-list'

import { FilmCard } from './film.card'

interface FilmListProps {
  items: MovieItemShortened[]
}
export function FilmList({ items }: FilmListProps) {
  return (
    <ul className="grid w-full grid-cols-2 gap-x-3 gap-y-4 sm:md:grid-cols-3 md:grid-cols-4 md:gap-x-4 lg:grid-cols-4 xl:grid-cols-4">
      {items?.map((filmItem: MovieItemShortened, index) => (
        <li key={filmItem.slug} className="w-full">
          <FilmCard {...filmItem} isPriority={index < 4} />
        </li>
      ))}
    </ul>
  )
}
