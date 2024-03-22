import { notFound } from "next/navigation";

import { FilmCarousel } from "@/components/ui/film/film.carousel";
import { FilmList } from "@/components/ui/film/film.list";
import { FilmPagination } from "@/components/ui/film/film.pagination";
import { TopView } from "@/components/ui/film/film.top-view";
import { Separator } from "@/components/ui/separator";
import { getFilms } from "@/lib/fetcher";
import { calculatePageList } from "@/lib/pagination";
import { THomePageProps } from "@/types/movie-list";

export default async function Home({ searchParams }: THomePageProps) {
  const pageParam =
    typeof searchParams?.page === "string" && Number(searchParams?.page) > 0
      ? Number(searchParams?.page)
      : 1;
  const films = await getFilms(pageParam);
  
  if(!films){
    notFound()
  }

  const {items, paginate } = films;
  const totalPage = paginate.total_page;
  const PAGE_TO_DISPLAY = 2;
  let currentPage = 1;
  if (Number(pageParam) > 1) {
    currentPage = Number(pageParam);
  }
  const pageList = calculatePageList(currentPage, PAGE_TO_DISPLAY, totalPage);
  return (
    <main className="container space-y-4">
      <FilmCarousel items={items} title="Thịnh hành" />
      <Separator />
      <section className="grid grid-cols-12 gap-x-6 gap-y-4">
        <div className="flex flex-col sm:col-span-9 col-span-12 gap-2">
          <div className="flex gap-3 pb-2">
            <h2 className="text-[14px] font-medium cursor-pointer transition-all ease-linear duration-100 rounded-sm px-3 py-1 uppercase block bg-[#a5695fd4]">
              PHIM BỘ MỚI
            </h2>
          </div>
          <FilmList items={items} />
          <FilmPagination
            currentPage={currentPage}
            pageList={pageList}
            totalPage={totalPage}
          />
        </div>
        <div className="hidden sm:block sm:col-span-3 col-span-12">
          <TopView topViewData={items} />
        </div>
      </section>
    </main>
  );
}
