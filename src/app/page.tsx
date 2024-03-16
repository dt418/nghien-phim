import { FilmCard, IFilmCardProps } from "@/components/ui/film/film.card";
import { FilmPagination } from "@/components/ui/film/film.pagination";
import { getFilms } from "@/lib/fetcher";

type THomePageProps = {
  params?: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function Home({ searchParams }: THomePageProps) {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const { items, paginate } = await getFilms(page);
  const totalPage = paginate.total_page;
  const PAGE_TO_DISPLAY = 2;

  let currentPage = 1;
  if (Number(searchParams.page) > 1) {
    currentPage = Number(searchParams.page);
  }
  const pageList: number[] = [];

  for (
    let i = currentPage - PAGE_TO_DISPLAY;
    i < currentPage + PAGE_TO_DISPLAY;
    i++
  ) {
    if (i < 1) continue;
    if (i > totalPage) break;
    pageList.push(i);
  }

  return (
    <main className="container space-y-4">
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {items?.map((filmItem: IFilmCardProps) => {
          return (
            <li key={filmItem.slug}>
              <FilmCard {...filmItem} />
            </li>
          );
        })}
      </ul>
      <FilmPagination currentPage={currentPage} pageList={pageList} totalPage={totalPage}/>
    </main>
  );
}