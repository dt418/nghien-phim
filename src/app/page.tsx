import { notFound } from "next/navigation";
import { Redis } from "@upstash/redis";

import { FilmCarousel } from "@/components/ui/film/film.carousel";
// import CustomPagination from "@/components/ui/film/film.custom-pagination";
import { FilmList } from "@/components/ui/film/film.list";
import { FilmPagination } from "@/components/ui/film/film.pagination";
// import { FilmPagination } from "@/components/ui/film/film.pagination";
import { TopView } from "@/components/ui/film/film.top-view";
import { Separator } from "@/components/ui/separator";
import { getFilms } from "@/lib/fetcher";
// import { calculatePageList } from "@/lib/pagination";
import { THomePageProps } from "@/types/movie-list";

const redis = Redis.fromEnv();
export const revalidate = 0;

export default async function Home({ searchParams }: THomePageProps) {
  const pageParam =
    typeof searchParams?.page === "string" && Number(searchParams?.page) > 0
      ? Number(searchParams?.page)
      : 1;
  const films = await getFilms(pageParam);

  if (!films) {
    notFound();
  }

  const { items, paginate } = films;

  const views = (
    await redis.mget<number[]>(
      ...items.map((film) => ["pageviews", "films", film.slug].join(":"))
    )
  ).reduce((acc, v, i) => {
    acc[items[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  return (
    <main className="container space-y-4">
      <FilmCarousel items={items} title="Thịnh hành" />
      <Separator />
      <section className="grid grid-cols-12 gap-x-6 gap-y-4">
        <div className="flex flex-col sm:col-span-9 col-span-12 gap-2">
          <div className="flex gap-3 pb-2">
            <h2 className="text-[14px] font-medium cursor-pointer transition-all ease-linear duration-100 rounded-sm px-3 py-1 uppercase block bg-tertiary">
              PHIM BỘ MỚI
            </h2>
          </div>
          <FilmList items={items} />
          {/* <CustomPagination
            className="grid place-items-center"
            total={paginate.total_page}
            initialPage={paginate.current_page}
          /> */}
          <FilmPagination
            currentPage={paginate.current_page}
            totalPage={paginate.total_page}
          />
        </div>
        <div className="hidden sm:block sm:col-span-3 col-span-12">
          <TopView topViewData={items} views={views} />
        </div>
      </section>
    </main>
  );
}
