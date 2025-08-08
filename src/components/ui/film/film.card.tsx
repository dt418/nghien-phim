/**
 * Import internal dependencies
 */
import { memo } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { motion } from 'framer-motion'
/**
 * Import external dependencies
 */
import { PlayIcon } from 'lucide-react'

import { isImageUrl } from '~/lib/stringUtils'

import type { MovieItemShortened } from '~/types/movie-list'

import { Card, CardContent } from '../card'

/**
 * Props interface extending base movie properties
 * @interface IFilmCardProps
 * @extends {MovieItemShortened}
 */
interface FilmCardProps extends MovieItemShortened {
  /** Flag to set image loading priority */
  isPriority?: boolean
  /** Card index for staggered animations */
  index?: number
}

const imageVariants = {
  hidden: { scale: 0.95, opacity: 0.8 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
}

const overlayVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: 0.1 },
  },
}

const iconVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 0, opacity: 0 },
  hover: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
}

/**
 * FilmCard Component - Displays a movie card with image and details
 * @param {FilmCardProps} props - Component props
 * @returns {React.ReactElement} Rendered FilmCard component
 */
function FilmCard({
  name,
  slug,
  thumb_url,
  original_name,
  isPriority = false,
  index = 0,
}: Readonly<FilmCardProps>): React.ReactElement {
  // Constants
  const filmLink = `/phim/${slug}`
  const fallbackImage = '/film-placeholder.png'
  const staggerDelay = Math.min(index * 0.1, 0.5) // Cap delay at 0.5s

  return (
    <Link className="font-semibold" href={filmLink} title={name}>
      <motion.div
        initial="hidden"
        animate="visible"
        whileHover="hover"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, delay: staggerDelay },
          },
        }}
      >
        <Card className="w-full rounded-lg border shadow-sm">
          <CardContent className="group relative overflow-hidden rounded-lg px-0">
            {/* Image Container */}
            <motion.div
              className="relative overflow-hidden rounded-t-lg aspect-[2/3]"
              variants={imageVariants}
            >
              <Image
                className="rounded-t-lg"
                alt={name || original_name}
                src={isImageUrl(thumb_url) ? thumb_url : fallbackImage}
                fill
                priority={isPriority}
                sizes="(min-width: 1480px) 236px, (min-width: 780px) calc(17.21vw - 15px), (min-width: 640px) calc(37.5vw - 38px), calc(56.56vw - 50px)"
                style={{ objectFit: 'cover', aspectRatio: 2 / 3 }}
                loading={isPriority ? 'eager' : 'lazy'}
              />
              {/* Play Icon Overlay */}
              <motion.div
                className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
                variants={iconVariants}
              >
                <PlayIcon className="h-16 w-16 rounded-full bg-accent/50 p-4 text-primary" />
              </motion.div>
            </motion.div>

            {/* Movie Details Overlay */}
            <motion.div
              variants={overlayVariants}
              className="absolute inset-x-0 bottom-0 left-0 z-0 flex h-1/2 flex-col justify-end bg-gradient-to-t from-green-700 to-transparent p-4 transition-all md:opacity-100"
            >
              <h3 className="line-clamp-1 block truncate pt-1 text-[15px] font-medium capitalize">
                {name}
              </h3>
              <p className="line-clamp-1 truncate text-sm font-normal">
                {original_name}
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}

// Memoize component to prevent unnecessary re-renders
export default memo(FilmCard)
// Export non-memoized version for direct imports
export { FilmCard }
