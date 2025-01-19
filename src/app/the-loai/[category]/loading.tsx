import { cva } from 'class-variance-authority';
import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

type TableHeader = {
  width: number;
  skeletonWidth: number;
  className?: string;
};

type BreadcrumbItem = {
  width: number;
  hasIcon?: boolean;
  current?: boolean;
};

const TABLE_HEADERS: TableHeader[] = [
  { width: 250, skeletonWidth: 60, className: 'md:w-1/3' },
  { width: 100, skeletonWidth: 80 },
  { width: 150, skeletonWidth: 70 },
  { width: 40, skeletonWidth: 40 },
  { width: 60, skeletonWidth: 60 },
  { width: 200, skeletonWidth: 100 },
] as const;

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { width: 20 },
  { width: 24, hasIcon: true },
  { width: 32, hasIcon: true, current: true },
] as const;

const tableCellVariants = cva('', {
  variants: {
    variant: {
      default: '',
      title: 'min-w-[250px] md:w-1/3',
      status: 'min-w-[100px]',
      date: 'min-w-[150px]',
      compact: '',
      truncated: 'truncate',
      actions: 'min-w-[200px]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const skeletonVariants = cva('', {
  variants: {
    variant: {
      title: 'h-4 w-[120px]',
      subtitle: 'h-3 w-[80px]',
      icon: 'h-12 w-8 rounded',
      status: 'h-6 w-16 rounded-full',
      text: 'h-4',
      breadcrumb: 'h-4',
      breadcrumbIcon: 'mx-1 h-4 w-4',
      header: 'h-8 w-[250px]',
    },
  },
  defaultVariants: {
    variant: 'text',
  },
});

// Memoized skeleton row component to prevent unnecessary re-renders
const SkeletonTableRow = React.memo(() => {
  const cellConfigs = [
    {
      variant: 'title' as const,
      content: (
        <div className="flex items-center space-x-3">
          <Skeleton className={skeletonVariants({ variant: 'icon' })} />
          <div className="space-y-1">
            <Skeleton className={skeletonVariants({ variant: 'title' })} />
            <Skeleton className={skeletonVariants({ variant: 'subtitle' })} />
          </div>
        </div>
      ),
    },
    {
      variant: 'status' as const,
      content: <Skeleton className={skeletonVariants({ variant: 'status' })} />,
    },
    {
      variant: 'date' as const,
      content: (
        <Skeleton
          className={cn(skeletonVariants({ variant: 'text' }), 'w-20')}
        />
      ),
    },
    {
      variant: 'compact' as const,
      content: (
        <Skeleton
          className={cn(skeletonVariants({ variant: 'text' }), 'w-12')}
        />
      ),
    },
    {
      variant: 'truncated' as const,
      content: (
        <Skeleton
          className={cn(skeletonVariants({ variant: 'text' }), 'w-24')}
        />
      ),
    },
    {
      variant: 'actions' as const,
      content: (
        <Skeleton
          className={cn(skeletonVariants({ variant: 'text' }), 'w-32')}
        />
      ),
    },
  ];

  return (
    <TableRow>
      {cellConfigs.map((config, index) => (
        <TableCell
          key={index}
          className={tableCellVariants({ variant: config.variant })}
        >
          {config.content}
        </TableCell>
      ))}
    </TableRow>
  );
});

SkeletonTableRow.displayName = 'SkeletonTableRow';

const BreadcrumbSkeleton = () => (
  <nav className="flex" aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1 md:space-x-3">
      {BREADCRUMB_ITEMS.map((item, index) => (
        <li
          key={index}
          className={cn(item.current ? undefined : 'inline-flex items-center')}
        >
          <div className="flex items-center">
            {item.hasIcon && (
              <Skeleton
                className={skeletonVariants({ variant: 'breadcrumbIcon' })}
              />
            )}
            <Skeleton
              className={cn(
                skeletonVariants({ variant: 'breadcrumb' }),
                `w-${item.width}`
              )}
            />
          </div>
        </li>
      ))}
    </ol>
  </nav>
);

export default function CategoryLoading() {
  return (
    <div className="min-h-screen space-y-6 bg-background p-4">
      <BreadcrumbSkeleton />
      <Skeleton className={skeletonVariants({ variant: 'header' })} />

      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {TABLE_HEADERS.map((header, index) => (
                <TableHead
                  key={index}
                  className={cn(`min-w-[${header.width}px]`, header.className)}
                >
                  <Skeleton
                    className={cn(
                      skeletonVariants({ variant: 'text' }),
                      `w-[${header.skeletonWidth}px]`
                    )}
                  />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonTableRow key={index} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
