import type { Metadata, ResolvingMetadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { loadSearchParams } from '@/components/ui/header/page-search-params';
import SearchBreadcrumb from '@/components/ui/search/search-breadcrumb';
import SearchMovieTable from '@/components/ui/search/search-movie-table';
import { Separator } from '@/components/ui/separator';
import { searchFilms } from '@/lib/api';
import config from '@/lib/config';
import { TSearchPageProps, TSearchResultsProps } from '@/types/search';

export const revalidate = 3600;

/**
 * Renders search results including breadcrumb, title and movie table
 */
const SearchResults = ({
  searchTerm,
  searchResult,
  rawSearchTerm,
}: Readonly<TSearchResultsProps>) => {
  const {
    items,
    paginate: { current_page = 1 },
  } = searchResult;

  return (
    <div className="flex flex-col gap-4">
      <SearchBreadcrumb
        breadcrumbData={{
          keyword: searchTerm,
          rawKeyword: rawSearchTerm,
          currentPage: current_page,
        }}
      />
      <Separator />
      <h2 className="uppercase">Kết quả tìm kiếm cho: {rawSearchTerm}</h2>
      <div className="overflow-x-auto">
        <SearchMovieTable data={items} />
      </div>
    </div>
  );
};

export async function generateMetadata(
  { searchParams }: TSearchPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { keyword } = await loadSearchParams(searchParams);
  const previousImages = (await parent).openGraph?.images || [];
  if (!keyword) {
    notFound();
  }

  const { items } = await searchFilms(keyword);

  return {
    title: `Tìm kiếm phim: ${keyword}`,
    description: `Xem danh sách phim theo từ khóa ${keyword} online với phụ đề tiếng Việt`,
    openGraph: {
      title: `Tìm kiếm phim: ${keyword}`,
      description: `Xem danh sách phim theo từ khóa ${keyword} online với phụ đề tiếng Việt`,
      images: [String(items[0].poster_url), ...previousImages],
      url: `${config.NEXT_PUBLIC_BASE_URL}/tim-kiem?keyword=${keyword}`,
    },
  };
}

/**
 * Main search page component
 * Handles search term extraction and result fetching
 */
export default async function SearchPage({
  searchParams,
}: Readonly<TSearchPageProps>) {
  const { keyword } = await loadSearchParams(searchParams);
  if (!keyword) {
    notFound();
  }

  const cookiesStore = await cookies();
  const rawKeyword = cookiesStore.has('keyword')
    ? (cookiesStore.get('keyword')?.value as string)
    : keyword;

  const searchResult = await searchFilms(keyword);

  if (!searchResult?.items) {
    return <p>Không tìm thấy kết quả nào</p>;
  }

  return (
    <SearchResults
      searchTerm={keyword}
      searchResult={searchResult}
      rawSearchTerm={rawKeyword}
    />
  );
}
