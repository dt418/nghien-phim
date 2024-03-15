import { FilmCard, IFilmCardProps } from "@/components/ui/film-card";
import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { type IMovieListResponse } from "@/types/movie-list";

async function getFilms(page: number): Promise<IMovieListResponse> {
  const res = await fetch(
    `https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=${page}`,
    { cache: "no-store" }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

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
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <>
              <PaginationItem>
                <PaginationFirst
                  href={`/?page=${1}`}
                  tabIndex={currentPage <= 1 ? -1 : undefined}
                  className={
                    currentPage <= 1
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  href={`/?page=${page - 1}`}
                  tabIndex={currentPage <= 1 ? -1 : undefined}
                  className={
                    currentPage <= 1
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>
            </>
          )}
          {pageList.map((pageItem) => (
            <PaginationItem key={pageItem}>
              <PaginationLink
                href={`/?page=${pageItem}`}
                tabIndex={currentPage <= 1 ? -1 : undefined}
                isActive={pageItem === currentPage}
              >
                {pageItem}
              </PaginationLink>
            </PaginationItem>
          ))}
          {currentPage < totalPage && (
            <>
              <PaginationItem>
                <PaginationNext
                  href={`/?page=${page + 1}`}
                  tabIndex={currentPage === totalPage ? -1 : undefined}
                  className={
                    currentPage === totalPage
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast
                  href={`/?page=${totalPage}`}
                  tabIndex={currentPage <= 1 ? -1 : undefined}
                  className={
                    currentPage >= totalPage
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </main>
  );
}