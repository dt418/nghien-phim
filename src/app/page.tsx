import { Redis } from '@upstash/redis';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import { FilmCarousel } from '@/components/ui/film/film.carousel';
import { FilmList } from '@/components/ui/film/film.list';
// import { FilmPagination } from '@/components/ui/film/film.pagination';
import { TopView } from '@/components/ui/film/film.top-view';
import { Separator } from '@/components/ui/separator';
import { getFilmByCategory, getFilms } from '@/lib/api';
import { THomePageProps } from '@/types/movie-list';

const redis = Redis.fromEnv();

export const revalidate = 10;

export async function generateMetadata(
  { searchParams }: THomePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { page } = await searchParams;
  const pageParam =
    typeof page === 'string' && Number(page) > 0 ? Number(page) : 1;
  const { items } = await getFilms(pageParam);

  const previousImages = (await parent).openGraph?.images || [];
  return {
    openGraph: {
      title: 'Danh sách phim mới nhất | nghienphim.netlify.app',
      description:
        'Xem phim mới nhất miễn phí tại nghienphim.netlify.app | Web xem phim miễn phí tốc độ cao',
      url: 'https://nghienphim.netlify.app/',
      siteName: 'nghienphim.netlify.app',
      images: [String(items[0].poster_url), ...previousImages],
      type: 'website',
    },
  };
}

export default async function Home({ searchParams }: Readonly<THomePageProps>) {
  const { page } = await searchParams;
  const pageParam =
    typeof page === 'string' && Number(page) > 0 ? Number(page) : 1;
  const [films, phim_chieu_rap, phim_bo, phim_le, phim_hoat_hinh] =
    await Promise.all([
      getFilms(pageParam),
      getFilmByCategory('phim-dang-chieu'),
      getFilmByCategory('phim-bo'),
      getFilmByCategory('phim-le'),
      getFilmByCategory('hoat-hinh'),
    ]);

  if (!films) {
    notFound();
  }

  const { items } = films;

  const views = (
    await redis.mget<number[]>(
      ...items.map((film) => ['pageviews', 'films', film.slug].join(':'))
    )
  ).reduce(
    (acc, v, i) => {
      acc[items[i].slug] = v ?? 0;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <main className="container space-y-4">
      <FilmCarousel items={items} title="Thịnh hành" />
      <Separator />
      <section className="grid grid-cols-12 gap-x-6 gap-y-4">
        <div className="col-span-12 flex flex-col gap-2 md:col-span-9">
          <div className="flex gap-3 pb-2">
            <h2 className="bg-gradient block cursor-pointer rounded-sm px-3 py-1 text-[14px] font-medium uppercase text-foreground transition-all duration-100 ease-linear">
              PHIM CHIẾU RẠP
            </h2>
          </div>
          <FilmList items={phim_chieu_rap.items} />
          {/* <FilmPagination
            currentPage={phim_chieu_rap.paginate.current_page}
            totalPage={phim_chieu_rap.paginate.total_page}
          /> */}
        </div>
        <div className="col-span-12 hidden md:col-span-3 md:block">
          <TopView
            topViewData={phim_chieu_rap.items}
            views={views}
            title="Top phim chiếu rạp"
          />
        </div>
      </section>
      <Separator />
      <section className="grid grid-cols-12 gap-x-6 gap-y-4">
        <div className="col-span-12 flex flex-col gap-2 md:col-span-9">
          <div className="flex gap-3 pb-2">
            <h2 className="bg-gradient block cursor-pointer rounded-sm px-3 py-1 text-[14px] font-medium uppercase text-foreground transition-all duration-100 ease-linear">
              PHIM BỘ MỚI
            </h2>
          </div>
          <FilmList items={phim_bo.items} />
          {/* <FilmPagination
            currentPage={phim_bo.paginate.current_page}
            totalPage={phim_bo.paginate.total_page}
          /> */}
        </div>
        <div className="col-span-12 hidden md:col-span-3 md:block">
          <TopView
            topViewData={phim_bo.items}
            views={views}
            title="Top phim bộ"
          />
        </div>
      </section>
      <Separator />
      <section className="grid grid-cols-12 gap-x-6 gap-y-4">
        <div className="col-span-12 flex flex-col gap-2 md:col-span-9">
          <div className="flex gap-3 pb-2">
            <h2 className="bg-gradient block cursor-pointer rounded-sm px-3 py-1 text-[14px] font-medium uppercase text-foreground transition-all duration-100 ease-linear">
              PHIM LẺ MỚI
            </h2>
          </div>
          <FilmList items={phim_le.items} />
          {/* <FilmPagination
            currentPage={phim_le.paginate.current_page}
            totalPage={phim_le.paginate.total_page}
          /> */}
        </div>
        <div className="col-span-12 hidden md:col-span-3 md:block">
          <TopView
            topViewData={phim_le.items}
            views={views}
            title="Top phim lẻ"
          />
        </div>
      </section>
      <Separator />
      <section className="grid grid-cols-12 gap-x-6 gap-y-4">
        <div className="col-span-12 flex flex-col gap-2 md:col-span-9">
          <div className="flex gap-3 pb-2">
            <h2 className="bg-gradient block cursor-pointer rounded-sm px-3 py-1 text-[14px] font-medium uppercase text-foreground transition-all duration-100 ease-linear">
              PHIM HOẠT HÌNH
            </h2>
          </div>
          <FilmList items={phim_hoat_hinh.items} />
          {/* <FilmPagination
            currentPage={phim_hoat_hinh.paginate.current_page}
            totalPage={phim_hoat_hinh.paginate.total_page}
          /> */}
        </div>
        <div className="col-span-12 hidden md:col-span-3 md:block">
          <TopView
            topViewData={phim_hoat_hinh.items}
            views={views}
            title="Top phim hoạt hình"
          />
        </div>
      </section>
    </main>
  );
}
