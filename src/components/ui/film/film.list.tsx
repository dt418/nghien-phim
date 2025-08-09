'use client'

import { memo, useMemo, useRef } from 'react'

import { useVirtualizer } from '@tanstack/react-virtual'
import { motion } from 'framer-motion'

import { useDeviceSize } from '~/hooks/use-device-size'

import type { MovieItemShortened } from '~/types/movie-list'

import FilmCard from './film.card'

interface FilmListProps {
  items: MovieItemShortened[]
  isLoading?: boolean
  showVirtualization?: boolean
}

/**
 * Optimized film list component with virtualization for large lists
 * Uses tanstack virtual for efficient rendering of large lists
 * And implements responsive grid system for different screen sizes
 */
function FilmList({
  items,
  showVirtualization = true,
}: FilmListProps) {
  const { isTablet, isDesktop } = useDeviceSize()
  const parentRef = useRef<HTMLDivElement>(null)

  // Determine number of columns based on screen size using useMemo
  const columns = useMemo(() => {
    if (isDesktop)
      return 4
    if (isTablet)
      return 3
    return 2
  }, [isDesktop, isTablet])

  // Skip virtualization for small lists
  const shouldVirtualize = showVirtualization && items.length > 12

  // Calculate rows for virtualization
  const rows = shouldVirtualize
    ? Math.ceil(items.length / columns)
    : 0

  // Initialize virtualizer hook unconditionally to avoid lint errors
  const virtualizer = useVirtualizer({
    count: rows,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 320, // Estimate row height
    overscan: 5, // Load more items for smoother scrolling
    enabled: shouldVirtualize, // Only enable when needed
  })

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  // Regular grid view without virtualization
  if (!shouldVirtualize) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid w-full grid-cols-2 gap-x-3 gap-y-4 sm:md:grid-cols-3 md:grid-cols-4 md:gap-x-4 lg:grid-cols-4 xl:grid-cols-5"
      >
        {items?.map((filmItem: MovieItemShortened, index) => (
          <div key={filmItem.slug} className="w-full">
            <FilmCard {...filmItem} isPriority={index < 4} index={index} />
          </div>
        ))}
      </motion.div>
    )
  }

  // Virtualized list for better performance with large data sets
  return (
    <div
      ref={parentRef}
      className="h-[800px] w-full overflow-auto"
      style={{ contain: 'strict' }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * columns
          // Get items for this row
          const rowItems = items.slice(startIndex, startIndex + columns)

          return (
            <div
              key={virtualRow.index}
              className={`absolute top-0 left-0 grid w-full grid-cols-${columns} gap-x-3 gap-y-4`}
              style={{
                transform: `translateY(${virtualRow.start}px)`,
                height: `${virtualRow.size}px`,
              }}
            >
              {rowItems.map((filmItem, colIndex) => {
                const itemIndex = startIndex + colIndex
                return (
                  <div key={filmItem.slug} className="w-full">
                    <FilmCard
                      {...filmItem}
                      isPriority={itemIndex < 8}
                      index={0} // Reset animation index for virtualized items
                    />
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Export memoized component for better performance
export default memo(FilmList)
export { FilmList }
