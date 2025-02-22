import { Skeleton } from '@/components/ui/skeleton';

const DetailsSkeleton = () => (
  <div className="flex-1 space-y-6">
    <div className="space-y-4">
      <Skeleton className="h-8 w-full max-w-[600px] bg-gray-800/50" />
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-7 w-16 rounded-full bg-gray-800/50" />
        <Skeleton className="h-7 w-24 rounded-full bg-gray-800/50" />
        <Skeleton className="h-7 w-20 rounded-full bg-gray-800/50" />
      </div>
    </div>
    <div className="flex items-center gap-4">
      <Skeleton className="h-6 w-32 rounded bg-gray-800/50" />
      <Skeleton className="h-6 w-24 rounded bg-gray-800/50" />
    </div>
    <CastSkeleton />
    <SynopsisSkeleton />
  </div>
);

const CastSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-6 w-32 bg-gray-800/50" />
    <div className="flex flex-wrap gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full bg-gray-800/50" />
          <Skeleton className="h-4 w-24 bg-gray-800/50" />
        </div>
      ))}
    </div>
  </div>
);

const SynopsisSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-6 w-32 bg-gray-800/50" />
    <div className="space-y-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 bg-gray-800/50 ${i === 2 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  </div>
);

const EpisodesSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <Skeleton className="h-7 w-40 bg-gray-800/50" />
      <Skeleton className="h-7 w-32 rounded-lg bg-gray-800/50" />
    </div>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="aspect-video w-full rounded-lg bg-gray-800/50" />
          <Skeleton className="h-4 w-3/4 bg-gray-800/50" />
          <Skeleton className="h-3 w-1/2 bg-gray-800/50" />
        </div>
      ))}
    </div>
  </div>
);

const HeroSkeleton = () => (
  <div className="relative min-h-[600px]">
    {/* Background Image Skeleton */}
    <div className="absolute inset-0">
      <Skeleton className="h-80 w-full bg-gray-800/50" />
    </div>

    {/* Gradient Overlays */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30" />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

    {/* Content */}
    <div className="relative mx-auto mt-80 min-h-[600px] max-w-7xl px-4">
      <div className="justify-top flex h-full flex-col gap-8 pb-16 md:flex-row md:items-end md:gap-10 md:pb-24">
        {/* Poster */}
        <div className="flex-shrink-0">
          <Skeleton className="aspect-[2/3] w-full max-w-[300px] rounded-xl bg-gray-800/50 md:h-[450px] md:w-[300px]" />
          <div className="mt-4 flex items-center justify-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-800/50" />
            <Skeleton className="h-10 w-10 rounded-full bg-gray-800/50" />
            <Skeleton className="h-10 w-10 rounded-full bg-gray-800/50" />
          </div>
        </div>

        {/* Details */}
        <DetailsSkeleton />
      </div>
    </div>
  </div>
);

export default function MovieDetailLoading() {
  return (
    <main className="min-h-screen bg-background pb-8 text-white">
      <HeroSkeleton />
      <div className="mx-auto max-w-7xl px-4">
        <div className="mt-10">
          <EpisodesSkeleton />
        </div>
      </div>
    </main>
  );
}
