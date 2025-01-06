import { Play } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

// MoviePosterSkeleton component
const MoviePosterSkeleton = () => (
  <div className="flex-shrink-0">
    <Skeleton className="h-[300px] w-[200px] rounded-lg bg-gray-800" />
  </div>
);

// MovieDetailsSkeleton component
const MovieDetailsSkeleton = () => (
  <div className="flex-1 space-y-4">
    <Skeleton className="h-8 w-3/4 bg-gray-800" />
    <div className="space-y-3">
      {[...Array(7)].map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 bg-gray-800" />
          <Skeleton className="h-4 w-full max-w-[600px] bg-gray-800" />
        </div>
      ))}
    </div>
  </div>
);

// VideoPlayerSkeleton component
const VideoPlayerSkeleton = () => (
  <div className="relative aspect-video w-full rounded-lg bg-gray-800">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-700/50">
        <Play className="h-8 w-8 text-gray-400" />
      </div>
    </div>
  </div>
);

// SynopsisSkeleton component
const SynopsisSkeleton = () => (
  <div className="space-y-2">
    <Skeleton className="h-6 w-32 bg-gray-800" />
    <Skeleton className="h-4 w-full max-w-[800px] bg-gray-800" />
    <Skeleton className="h-4 w-full max-w-[600px] bg-gray-800" />
  </div>
);

// EpisodesSkeleton component
const EpisodesSkeleton = () => (
  <div className="flex items-center justify-center gap-2 py-4">
    {[...Array(8)].map((_, i) => (
      <Skeleton key={i} className="h-10 w-10 rounded bg-gray-800" />
    ))}
  </div>
);

export default function WatchMovieLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto space-y-6 p-4">
        <div className="flex flex-col gap-6 md:flex-row">
          <MoviePosterSkeleton />
          <MovieDetailsSkeleton />
        </div>
        <VideoPlayerSkeleton />
        <SynopsisSkeleton />
        <EpisodesSkeleton />
      </div>
    </div>
  );
}
