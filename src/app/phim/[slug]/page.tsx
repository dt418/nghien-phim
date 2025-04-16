import type { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Redis } from '@upstash/redis'
import { PlayCircle, UsersRound } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { MovieStats } from '~/components/ui/film/film.stats'
import { Separator } from '~/components/ui/separator'

import { getMovieStats } from '~/config'

import { getFilmBySlug } from '~/lib/api'
import { isImageUrl, stringToSlug, textTruncate } from '~/lib/stringUtils'
import { sanitizedHtml } from '~/lib/utils'

import type { FilmDetailPageProps } from '~/types/movie'

import { ReportView } from './view'

const redis = Redis.fromEnv()

export const revalidate = 10

// Keeping the existing generateMetadata function...
// generate meta data
export async function generateMetadata(
  { params }: FilmDetailPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params
  // fetch data
  const film = await getFilmBySlug(slug)
  if (!film) {
    notFound()
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? []

  return {
    description: textTruncate(String(film?.movie?.description)),
    openGraph: {
      description: textTruncate(String(film?.movie?.description)),
      images: [
        String(film?.movie?.poster_url ?? film?.movie?.thumb_url),
        ...previousImages,
      ],
      type: 'website',
    },
    title: film?.movie?.name,
    twitter: {
      description: textTruncate(String(film?.movie?.description)),
      images: [
        String(film?.movie?.poster_url ?? film?.movie?.thumb_url),
        ...previousImages,
      ],
    },
  }
}

export default async function FilmDetail({
  params,
}: Readonly<FilmDetailPageProps>) {
  const slug = (await params)?.slug
  if (!slug) {
    notFound()
  }
  const res = await getFilmBySlug(slug)

  if (!res) {
    notFound()
  }
  const views
    = (await redis.get<number>(['pageviews', 'films', slug].join(':'))) ?? 0

  const { movie } = res
  const movieStats = getMovieStats(movie)

  return (
    <div className="min-h-screen bg-black/95">
      {/* Add ReportView component to increment view count */}
      <ReportView slug={slug} />

      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={
            isImageUrl(movie?.poster_url)
              ? movie?.poster_url
              : '/film-placeholder.png'
          }
          alt={movie?.name}
          fill
          className="object-cover opacity-35"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content Section */}
      <div className="relative z-10 mx-auto -mt-48 max-w-7xl px-4">
        <div className="grid gap-8 md:grid-cols-[300px,1fr] lg:gap-12">
          {/* Poster */}
          <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
            <Image
              src={
                isImageUrl(movie?.thumb_url)
                  ? movie?.thumb_url
                  : '/film-placeholder.png'
              }
              alt={movie?.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Title and Views - Keep Existing */}
            <div>
              <h1 className="text-2xl font-bold text-white md:text-4xl lg:text-5xl">
                {movie?.name}
              </h1>
              <div className="mt-4 flex items-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <UsersRound className="h-4 w-4" />
                  {Intl.NumberFormat('vi-VN', { notation: 'compact' }).format(
                    views,
                  )}
                  {' '}
                  lượt xem
                </div>
                {movie?.quality && (
                  <div className="rounded-full bg-primary/20 px-3 py-1 text-sm text-primary">
                    {movie.quality}
                  </div>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <MovieStats stats={movieStats} />
            <Separator />
            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Diễn viên</h2>
              <p className="leading-relaxed text-gray-300">{movie?.casts}</p>
              <h2 className="text-xl font-semibold text-white">
                Nội dung phim
              </h2>
              <div
                className="leading-relaxed text-gray-300"
                // Using sanitizedHtml to safely render HTML content
                dangerouslySetInnerHTML={{
                  __html: sanitizedHtml(movie?.description),
                }}
              />
            </div>
          </div>
        </div>

        {/* Episodes Section */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-white">Xem phim</h2>
          <div className="space-y-8">
            {movie?.episodes?.map(ep => (
              <div key={ep.server_name} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-300">
                  {ep?.server_name}
                </h3>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-8 md:grid-cols-12">
                  {ep?.items?.toReversed()?.map(item => (
                    <Button
                      key={item.slug}
                      variant="secondary"
                      asChild
                      className="w-full transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <Link
                        href={`/phim/${movie?.slug}/${stringToSlug(ep?.server_name)}/xem-phim/${item?.slug}`}
                        className="flex items-center justify-center gap-2"
                      >
                        <PlayCircle className="h-4 w-4 shrink-0" />
                        {item?.name}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
