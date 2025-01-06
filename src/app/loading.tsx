import { Skeleton } from '@/components/ui/skeleton';

const HeaderSkeleton = () => (
  <div className="flex items-center justify-between border-b border-gray-800 p-4">
    <Skeleton className="h-6 w-32 bg-gray-800" />
  </div>
);

const CarouselSkeleton = () => (
  <div className="relative h-[400px] w-full overflow-hidden">
    <div className="flex gap-4 p-4">
      {[...Array(5)].map((_, i) => (
        <Skeleton
          key={`carousel-${i}`}
          className="h-[360px] w-[240px] flex-shrink-0 rounded-lg bg-gray-800"
        />
      ))}
    </div>
    <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black to-transparent" />
    <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent" />
  </div>
);

const MovieGridSkeleton = () => (
  <div className="flex-1">
    <Skeleton className="mb-6 h-8 w-32 bg-gray-800" />
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={`movie-${i}`} className="space-y-2">
          <Skeleton className="h-[300px] w-full rounded-lg bg-gray-800" />
          <Skeleton className="h-4 w-3/4 bg-gray-800" />
          <Skeleton className="h-3 w-1/2 bg-gray-800" />
        </div>
      ))}
    </div>
  </div>
);

const RankingSidebarSkeleton = () => (
  <div className="hidden w-80 lg:block">
    <div className="space-y-2 rounded-lg bg-gray-900 p-4">
      <Skeleton className="mb-4 h-6 w-1/2 bg-gray-800" />
      <Skeleton className="mb-4 h-6 w-full bg-gray-700" />
      {[...Array(20)].map((_, i) => (
        <div key={`ranking-${i}`} className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 bg-gray-800" />
          <Skeleton className="h-8 flex-1 bg-gray-800" />
          <Skeleton className="h-8 w-16 bg-gray-800" />
        </div>
      ))}
    </div>
  </div>
);

export default function HomePageLoading() {
  return (
    <div className="container min-h-screen bg-black text-white">
      <HeaderSkeleton />
      <CarouselSkeleton />
      <div className="flex gap-8 p-4">
        <MovieGridSkeleton />
        <RankingSidebarSkeleton />
      </div>
    </div>
  );
}
