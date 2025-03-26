import { Skeleton } from '~/components/ui/skeleton'

const ITEMS_PER_PAGE = 10
function HeaderSkeleton() {
  return (
    <div className="flex items-center justify-between border-b border-gray-800 p-2 sm:p-4">
      <Skeleton className="h-5 w-24 bg-gray-800 sm:h-6 sm:w-32" />
    </div>
  )
}

function CarouselSkeleton() {
  return (
    <div className="relative h-[200px] w-full overflow-hidden sm:h-[300px] md:h-[400px]">
      <div className="flex gap-2 p-2 sm:gap-4 sm:p-4">
        {[...Array.from({ length: 6 })].map(_ => (
          <Skeleton
            key={`carousel-${crypto.randomUUID()}`}
            className="h-[180px] w-[120px] flex-shrink-0 rounded-lg bg-gray-800 sm:h-[270px] sm:w-[180px] md:h-[360px] md:w-[240px]"
          />
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black to-transparent sm:w-12" />
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black to-transparent sm:w-12" />
    </div>
  )
}

function MovieGridSkeleton() {
  return (
    <div className="col-span-12 flex flex-col gap-2 md:col-span-9">
      <Skeleton className="mb-4 h-6 w-24 bg-gray-800 sm:mb-6 sm:h-8 sm:w-32" />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-4">
        {[...Array.from({ length: ITEMS_PER_PAGE })].map(_ => (
          <div key={`movie-${crypto.randomUUID()}`} className="relative">
            <Skeleton className="h-[175px] w-full rounded-lg bg-gray-800 sm:h-[200px] md:h-[300px]" />
            <div className="absolute bottom-0 w-full space-y-1 p-2">
              <Skeleton className="h-4 w-3/4 bg-gray-800" />
              <Skeleton className="h-3 w-1/2 bg-gray-800" />
            </div>
          </div>
        ))}
      </div>
      <MovieGirdPaginationSkeleton />
    </div>
  )
}

function MovieGirdPaginationSkeleton() {
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      {[...Array.from({ length: 5 })].map(_ => (
        <Skeleton
          key={`page-${crypto.randomUUID()}`}
          className="h-8 w-8 rounded-md bg-gray-800"
        />
      ))}
    </div>
  )
}

function RankingSidebarSkeleton() {
  return (
    <aside className="col-span-12 hidden md:col-span-3 md:block">
      <div className="space-y-2 rounded-lg bg-gray-900 p-2 sm:p-4">
        <Skeleton className="mb-2 h-5 w-1/2 bg-gray-800 sm:mb-4 sm:h-6" />
        <Skeleton className="mb-2 h-5 w-full bg-gray-700 sm:mb-4 sm:h-6" />
        {[...Array.from({ length: 10 })].map(_ => (
          <div
            key={`ranking-${crypto.randomUUID()}`}
            className="flex items-center gap-2 sm:gap-3"
          >
            <Skeleton className="h-6 w-6 bg-gray-800 sm:h-8 sm:w-8" />
            <Skeleton className="h-6 flex-1 bg-gray-800 sm:h-8" />
            <Skeleton className="h-6 w-12 bg-gray-800 sm:h-8 sm:w-16" />
          </div>
        ))}
      </div>
    </aside>
  )
}

export default function HomePageLoading() {
  return (
    <div className="container min-h-screen bg-black text-white">
      <HeaderSkeleton />
      <CarouselSkeleton />
      <div className="grid grid-cols-12 gap-x-6 gap-y-4">
        <MovieGridSkeleton />
        <RankingSidebarSkeleton />
      </div>
    </div>
  )
}
