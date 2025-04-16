import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import { Redis } from '@upstash/redis'

import { FilmCarousel } from '~/components/ui/film/film.carousel'
import { FilmList } from '~/components/ui/film/film.list'
import { FilmPagination } from '~/components/ui/film/film.pagination'
import { TopView } from '~/components/ui/film/film.top-view'
import { Separator } from '~/components/ui/separator'

import { getFilms } from '~/lib/api'

import type { HomePageProps } from '~/types/movie-list'

const redis = Redis.fromEnv()

export const revalidate = 10

export async function generateMetadata(
  { searchParams }: HomePageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { page } = await searchParams
  const pageParam
    = typeof page === 'string' && Number(page) > 0 ? Number(page) : 1
  const { items } = await getFilms(pageParam)

  const previousImages = (await parent).openGraph?.images || []
  return {
    openGraph: {
      title: 'Danh sách phim mới nhất | nghienphim.netlify.app',
      description:
        'Xem phim mới nhất miễn phí tại nghienphim.netlify.app | Web xem phim miễn phí tốc độ cao',
      url: 'https://nghienphim.netlify.app/',
      siteName: 'nghienphim.netlify.app',
      images:
        items.length > 0
          ? [String(items[0].poster_url), ...previousImages]
          : previousImages,
      type: 'website',
    },
  }
}

export default async function Home({ searchParams }: Readonly<HomePageProps>) {
  const { page } = await searchParams
  const pageParam
    = typeof page === 'string' && Number(page) > 0 ? Number(page) : 1
  const films = await getFilms(pageParam)

  if (!films) {
    notFound()
  }

  const { items, paginate } = films

  const views = (
    await redis.mget<number[]>(
      ...items.map(film => ['pageviews', 'films', film.slug].join(':')),
    )
  ).reduce(
    (acc, v, i) => {
      acc[items[i].slug] = v ?? 0
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <main className="container space-y-4">
      <FilmCarousel items={items} title="Thịnh hành" />
      <Separator />
      <section className="grid grid-cols-12 gap-x-6 gap-y-4">
        <div className="col-span-12 flex flex-col gap-2 md:col-span-9">
          <div className="flex gap-3 pb-2">
            <h2 className="bg-gradient block cursor-pointer rounded-sm px-3 py-1 text-[14px] font-medium uppercase text-foreground transition-all duration-100 ease-linear">
              PHIM BỘ MỚI
            </h2>
          </div>
          <FilmList items={items} />
          <FilmPagination
            currentPage={paginate.current_page}
            totalPage={paginate.total_page}
          />
        </div>
        <div className="col-span-12 hidden md:col-span-3 md:block">
          <TopView topViewData={items} views={views} />
        </div>
      </section>
    </main>
  )
}
