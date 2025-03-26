import { cva } from 'class-variance-authority'
import React from 'react'

import { Skeleton } from '~/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { cn } from '~/lib/utils'

interface TableHeaderProps {
  width: number
  className?: string
  skeletonWidth: number
}

interface BreadcrumbItem {
  width: number
  hasIcon?: boolean
  current?: boolean
}

const TABLE_HEADERS: TableHeaderProps[] = [
  { className: 'md:w-1/3', skeletonWidth: 60, width: 250 },
  { skeletonWidth: 80, width: 100 },
  { skeletonWidth: 70, width: 150 },
  { skeletonWidth: 40, width: 40 },
  { skeletonWidth: 60, width: 60 },
  { skeletonWidth: 100, width: 200 },
] as const

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { width: 20 },
  { hasIcon: true, width: 24 },
  { current: true, hasIcon: true, width: 32 },
] as const

const tableCellVariants = cva('', {
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    variant: {
      actions: 'min-w-[200px]',
      compact: '',
      date: 'min-w-[150px]',
      default: '',
      status: 'min-w-[100px]',
      title: 'min-w-[250px] md:w-1/3',
      truncated: 'truncate',
    },
  },
})

const skeletonVariants = cva('', {
  defaultVariants: {
    variant: 'text',
  },
  variants: {
    variant: {
      breadcrumb: 'h-4',
      breadcrumbIcon: 'mx-1 h-4 w-4',
      header: 'h-8 w-[250px]',
      icon: 'h-12 w-8 rounded',
      status: 'h-6 w-16 rounded-full',
      subtitle: 'h-3 w-[80px]',
      text: 'h-4',
      title: 'h-4 w-[120px]',
    },
  },
})

// Memoized skeleton row component to prevent unnecessary re-renders
const SkeletonTableRow = React.memo(() => {
  const cellConfigs = [
    {
      content: (
        <div className="flex items-center space-x-3">
          <Skeleton className={skeletonVariants({ variant: 'icon' })} />
          <div className="space-y-1">
            <Skeleton className={skeletonVariants({ variant: 'title' })} />
            <Skeleton className={skeletonVariants({ variant: 'subtitle' })} />
          </div>
        </div>
      ),
      variant: 'title' as const,
    },
    {
      content: <Skeleton className={skeletonVariants({ variant: 'status' })} />,
      variant: 'status' as const,
    },
    {
      content: (
        <Skeleton
          className={cn(skeletonVariants({ variant: 'text' }), 'w-20')}
        />
      ),
      variant: 'date' as const,
    },
    {
      content: (
        <Skeleton
          className={cn(skeletonVariants({ variant: 'text' }), 'w-12')}
        />
      ),
      variant: 'compact' as const,
    },
    {
      content: (
        <Skeleton
          className={cn(skeletonVariants({ variant: 'text' }), 'w-24')}
        />
      ),
      variant: 'truncated' as const,
    },
    {
      content: (
        <Skeleton
          className={cn(skeletonVariants({ variant: 'text' }), 'w-32')}
        />
      ),
      variant: 'actions' as const,
    },
  ]

  return (
    <TableRow>
      {cellConfigs.map(config => (
        <TableCell
          key={config.variant}
          className={tableCellVariants({ variant: config.variant })}
        >
          {config.content}
        </TableCell>
      ))}
    </TableRow>
  )
})

SkeletonTableRow.displayName = 'SkeletonTableRow'

function BreadcrumbSkeleton() {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {BREADCRUMB_ITEMS.map(item => (
          <li
            key={item.width}
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
                  `w-${item.width}`,
                )}
              />
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default function FilmByYearLoading() {
  return (
    <div className="min-h-screen space-y-6 bg-background p-4">
      <BreadcrumbSkeleton />
      <Skeleton className={skeletonVariants({ variant: 'header' })} />

      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {TABLE_HEADERS.map(header => (
                <TableHead
                  key={header.width}
                  className={cn(`min-w-[${header.width}px]`, header.className)}
                >
                  <Skeleton
                    className={cn(
                      skeletonVariants({ variant: 'text' }),
                      `w-[${header.skeletonWidth}px]`,
                    )}
                  />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map(_ => (
              <SkeletonTableRow key={`skeleton-row-${crypto.randomUUID()}`} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
