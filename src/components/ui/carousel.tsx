'use client'

import * as React from 'react'

import type { UseEmblaCarouselType } from 'embla-carousel-react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Button } from '~/components/ui/button'

import { cn } from '~/lib/utils'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

interface CarouselProps {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  setApi?: (api: CarouselApi) => void
  orientation?: 'horizontal' | 'vertical'
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.use(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

function Carousel({ ref, children, className, opts, orientation = 'horizontal', plugins, setApi, ...props }: React.HTMLAttributes<HTMLDivElement> & CarouselProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins,
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api)
      return

    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setCanScrollPrev(api.canScrollPrev())
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      }
      else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext],
  )

  React.useEffect(() => {
    if (!api || !setApi) {
      return
    }

    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) {
      return
    }

    onSelect(api)
    api.on('reInit', onSelect)
    api.on('select', onSelect)

    return () => {
      api?.off('select', onSelect)
    }
  }, [api, onSelect])

  const contextValue = React.useMemo(
    () => ({
      api,
      canScrollNext,
      canScrollPrev,
      carouselRef,
      opts,
      orientation:
          orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
      scrollNext,
      scrollPrev,
    }),
    [api, canScrollNext, canScrollPrev, carouselRef, opts, orientation, scrollNext, scrollPrev],
  )

  return (
    <CarouselContext value={contextValue}>
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext>
  )
}
Carousel.displayName = 'Carousel'

function CarouselContent({ ref, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className,
        )}
        {...props}
      />
    </div>
  )
}
CarouselContent.displayName = 'CarouselContent'

function CarouselItem({ ref, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className,
      )}
      {...props}
    />
  )
}
CarouselItem.displayName = 'CarouselItem'

function CarouselPrevious({ ref, className, size = 'icon', variant = 'outline', ...props }: React.ComponentProps<typeof Button> & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  const { canScrollPrev, orientation, scrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'absolute h-12 w-12 rounded-r-full',
        orientation === 'horizontal'
          ? 'left-0 top-1/2 -translate-y-1/2'
          : 'left-1/2 top-0 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-6 w-6" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
}
CarouselPrevious.displayName = 'CarouselPrevious'

function CarouselNext({ ref, className, size = 'icon', variant = 'outline', ...props }: React.ComponentProps<typeof Button> & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  const { canScrollNext, orientation, scrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'absolute h-12 w-12 rounded-l-full',
        orientation === 'horizontal'
          ? 'right-0 top-1/2 -translate-y-1/2'
          : 'bottom-0 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-6 w-6" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
}
CarouselNext.displayName = 'CarouselNext'

export {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
}
