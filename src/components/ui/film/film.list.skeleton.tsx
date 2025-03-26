import React from 'react'

import { FilmCardSkeleton } from './film.card.skeleton'

export default function FilmListSkeleton() {
  return (
    <div className="place-content-center-center grid w-full grid-cols-1 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 10 }, (_, i) => i).map(() => (
        <div key={`film-skeleton-${Math.random().toString(36).substring(7)}`} className="w-full">
          <FilmCardSkeleton />
        </div>
      ))}
    </div>
  )
}
