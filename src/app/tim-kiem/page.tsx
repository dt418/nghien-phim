import SearchBreadcrumb from '@/components/ui/search/search-breadcrumb';
import SearchMovieTable from '@/components/ui/search/search-movie-table';
import { Separator } from '@/components/ui/separator';
import { searchFilms } from '@/lib/api';
import { IMovieSearchListResponse } from '@/types/search';

type SearchPageProps = {
  searchParams: Promise<{ keyword: string | string[] }>;
};

type SearchResultsProps = {
  searchTerm: string;
  searchResult: Omit<IMovieSearchListResponse, 'status'>;
};

/**
 * Extracts and formats search term from search parameters
 */
const getSearchTerm = async (
  searchParams: Promise<{ keyword: string | string[] }>
) => {
  const { keyword = '' } = await searchParams;
  return Array.isArray(keyword) ? keyword.join(' ') : keyword;
};

/**
 * Renders search results including breadcrumb, title and movie table
 */
const SearchResults = ({
  searchTerm,
  searchResult,
}: Readonly<SearchResultsProps>) => {
  const {
    items,
    paginate: { current_page = 1 },
  } = searchResult;

  return (
    <div className="flex flex-col gap-4">
      <SearchBreadcrumb
        breadcrumbData={{
          keyword: searchTerm,
          currentPage: current_page,
        }}
      />
      <Separator />
      <h2 className="uppercase">Kết quả tìm kiếm cho: {searchTerm}</h2>
      <div className="overflow-x-auto">
        <SearchMovieTable data={items} />
      </div>
    </div>
  );
};

/**
 * Main search page component
 * Handles search term extraction and result fetching
 */
export default async function SearchPage({
  searchParams,
}: Readonly<SearchPageProps>) {
  const searchTerm = await getSearchTerm(searchParams);

  if (!searchTerm) {
    return <p>Vui lòng nhập từ khóa tìm kiếm</p>;
  }

  const searchResult = await searchFilms(searchTerm);

  if (!searchResult?.items) {
    return <p>Không tìm thấy kết quả nào</p>;
  }

  return <SearchResults searchTerm={searchTerm} searchResult={searchResult} />;
}
