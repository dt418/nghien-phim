"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";

import { IMovieBase } from "@/types/movie-list";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../carousel";

import { FilmCard } from "./film.card";

type TFilmCarouselProps = {
  items: IMovieBase[] | [];
};
export function FilmCarousel({ items = [] }: TFilmCarouselProps) {
  return (
    <Carousel
      className="w-full"
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent className="-ml-1">
        {items?.map((filmItem) => (
          <CarouselItem
            key={filmItem.slug}
            className="pl-1 basis-11/12 sm:basis-1/2 md:basis-1/4 lg:basis-1/5"
          >
            <div className="p-1">
              <FilmCard {...filmItem} key={filmItem.slug} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
