import { Skeleton } from '@/components/ui/skeleton';

// Components
const PosterSkeleton = () => (
  <div className="flex-shrink-0">
    <Skeleton className="h-[450px] w-[300px] rounded-lg bg-gray-800" />
  </div>
);

const DetailsSkeleton = () => (
  <div className="flex-1 space-y-6">
    <Skeleton className="h-8 w-3/4 bg-gray-800" />
    <ViewCountSkeleton />
    <CastSkeleton />
    <EpisodeInfoSkeleton />
    <SynopsisSkeleton />
  </div>
);

const ViewCountSkeleton = () => (
  <div className="flex items-center gap-2">
    <Skeleton className="h-4 w-4 bg-gray-800" />
    <Skeleton className="h-4 w-24 bg-gray-800" />
  </div>
);

const CastSkeleton = () => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Skeleton className="h-4 w-4 bg-gray-800" />
      <Skeleton className="h-4 w-full bg-gray-800" />
    </div>
  </div>
);

const EpisodeInfoSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 bg-gray-800" />
        <Skeleton className="h-4 w-32 bg-gray-800" />
      </div>
    ))}
  </div>
);

const SynopsisSkeleton = () => (
  <div className="mt-8 space-y-4">
    <Skeleton className="h-6 w-48 bg-gray-800" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-full bg-gray-800" />
      <Skeleton className="h-4 w-5/6 bg-gray-800" />
      <Skeleton className="h-4 w-4/6 bg-gray-800" />
    </div>
  </div>
);

const EpisodeSelectionSkeleton = () => (
  <div className="mt-12">
    <div className="flex items-center justify-center gap-4">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="h-10 w-10 rounded-md bg-gray-800" />
      ))}
    </div>
  </div>
);

export default function MovieDetailLoading() {
  return (
    <div className="min-h-screen bg-background text-white">
      <div className="container mx-auto">
        <div className="flex flex-col gap-8 md:flex-row">
          <PosterSkeleton />
          <DetailsSkeleton />
        </div>
        <EpisodeSelectionSkeleton />
      </div>
    </div>
  );
}
