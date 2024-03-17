import { FilmCard } from "@/components/ui/film/film.card";
import { FilmCarousel } from "@/components/ui/film/film.carousel";
import { FilmPagination } from "@/components/ui/film/film.pagination";
import { getFilms } from "@/lib/fetcher";
import { calculatePageList } from "@/lib/pagination";
import { IMovieBase } from "@/types/movie-list";

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
      <FilmCarousel filmList={items} />
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 place-items-center">
        {items?.map((filmItem: IMovieBase) => {
          return (
            <li key={filmItem.slug}>
              <FilmCard {...filmItem} />
            </li>
          );
        })}
      </ul>
      <FilmPagination
        currentPage={currentPage}
        pageList={pageList}
        totalPage={totalPage}
      />
    </main>
  );
}
