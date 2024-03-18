import { Suspense } from "react";

import { FilmCarousel } from "@/components/ui/film/film.carousel";
import { FilmCarouselSkeleton } from "@/components/ui/film/film.carousel.skeleton";
import FilmList from "@/components/ui/film/film.list";
import FilmListSkeleton from "@/components/ui/film/film.list.skeleton";
import { FilmPagination } from "@/components/ui/film/film.pagination";
import { getFilms } from "@/lib/fetcher";
import { calculatePageList } from "@/lib/pagination";

type THomePageProps = {
  params?: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function Home({ searchParams }: THomePageProps) {
  const pageParam =
    typeof searchParams.page === "string" && Number(searchParams.page) > 0
      ? Number(searchParams.page)
      : 1;
  const { items, paginate } = await getFilms(pageParam);
  const totalPage = paginate.total_page;
  const PAGE_TO_DISPLAY = 2;
  let currentPage = 1;
  if (Number(pageParam) > 1) {
    currentPage = Number(pageParam);
  }
  const pageList = calculatePageList(currentPage, PAGE_TO_DISPLAY, totalPage);
  return (
    <main className="container space-y-4">
      <Suspense fallback={<FilmCarouselSkeleton />}>
        <FilmCarousel items={items} />
      </Suspense>
      <Suspense fallback={<FilmListSkeleton />}>
        <FilmList items={items} />
      </Suspense>
      <FilmPagination
        currentPage={currentPage}
        pageList={pageList}
        totalPage={totalPage}
      />
    </main>
  );
}
