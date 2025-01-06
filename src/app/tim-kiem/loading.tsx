import { Skeleton } from '@/components/ui/skeleton';

const BreadcrumbLoading = () => (
  <div className="flex items-center gap-2 text-sm text-muted-foreground">
    <Skeleton className="h-4 w-20" />
    <Skeleton className="h-4 w-4" />
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-4 w-4" />
    <Skeleton className="h-4 w-16" />
  </div>
);

const SearchHeaderLoading = () => (
  <div className="space-y-4">
    <Skeleton className="h-6 w-72" />
    <div className="grid grid-cols-6 gap-4 py-3 text-sm">
      {['w-24', 'w-24', 'w-24', 'w-16', 'w-24', 'w-32'].map((width, i) => (
        <Skeleton key={i} className={`h-4 ${width}`} />
      ))}
    </div>
  </div>
);

const ResultRowLoading = () => (
  <div className="grid grid-cols-6 items-center gap-4 border-t border-border py-4">
    <div className="col-span-1 flex items-center gap-3">
      <Skeleton className="h-16 w-12 rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
    <Skeleton className="h-6 w-24" />
    <Skeleton className="h-4 w-16" />
    <Skeleton className="h-4 w-12" />
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-4 w-32" />
  </div>
);

export default function SearchPageLoading() {
  return (
    <div className="space-y-6">
      <BreadcrumbLoading />
      <SearchHeaderLoading />
      {[...Array(7)].map((_, i) => (
        <ResultRowLoading key={i} />
      ))}
    </div>
  );
}
