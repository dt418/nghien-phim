'use client'

import React from 'react'

import Autoplay from 'embla-carousel-autoplay'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../carousel'
import { FilmCardSkeleton } from './film.card.skeleton'

export function FilmCarouselSkeleton() {
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
        {Array.from({ length: 10 }).map(() => (
          <CarouselItem
            key={`skeleton-${Math.random().toString(36).substring(7)}`}
            className="basis-11/12 pl-1 sm:basis-1/2 md:basis-1/4 lg:basis-1/5"
          >
            <div className="p-1">
              <FilmCardSkeleton />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
