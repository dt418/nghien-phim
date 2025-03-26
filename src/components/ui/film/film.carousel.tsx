'use client'

import type { TMovieItemShortened } from '~/types/movie-list'
import Autoplay from 'embla-carousel-autoplay'
import React from 'react'
import { useMediaQuery } from '~/hooks/use-media'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../carousel'
import { FilmCard } from './film.card'

interface TFilmCarouselProps {
  title?: string
  items: TMovieItemShortened[] | []
}
export function FilmCarousel({ items, title }: TFilmCarouselProps) {
  const isAllMobile = useMediaQuery('(max-width: 768px)')
  return (
    <>
      {title
        ? (
            <h2 className="text-md text-gradient-to-t text-gradient border-l-[3px] border-solid border-primary pl-2 font-medium uppercase text-primary">
              {title}
            </h2>
          )
        : null}
      <Carousel
        className="w-full"
        opts={{ loop: true }}
        plugins={isAllMobile ? [] : [Autoplay({ delay: 1500 })]}
      >
        <CarouselContent className="-ml-1">
          {items?.map(filmItem => (
            <CarouselItem
              key={filmItem.slug}
              className="basis-1/2 pl-1 sm:basis-1/3 md:basis-1/6"
            >
              <div className="p-1">
                <FilmCard {...filmItem} key={filmItem.slug} isPriority />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  )
}
