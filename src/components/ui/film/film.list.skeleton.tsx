import React from "react";

import { FilmCardSkeleton } from "./film.card.skeleton";

export default function FilmListSkeleton() {
  return (
    <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 place-content-center-center place-items-center">
      {Array.from({ length: 10 }, (_, i) => i).map((_, index) => {
        return (
          <div key={index} className="w-full">
            <FilmCardSkeleton />
          </div>
        );
      })}
    </div>
  );
}
