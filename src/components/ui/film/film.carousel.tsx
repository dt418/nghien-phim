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
  filmList: IMovieBase[] | [];
};
export function FilmCarousel({ filmList = [] }: TFilmCarouselProps) {
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
        {filmList?.map((filmItem) => (
          <CarouselItem
            key={filmItem.slug}
            className="pl-1 basis-1/1 md:basis-1/3 lg:basis-1/4"
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
