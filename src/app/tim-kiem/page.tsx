import SearchBreadcrumb from '@/components/ui/search/search-breadcrumb';
import SearchMovieTable from '@/components/ui/search/search-movie-table';
import { Separator } from '@/components/ui/separator';
import { searchFilms } from '@/lib/api';
import { IMovieSearchListResponse } from '@/types/movie-list';

type SearchPageProps = {
  searchParams: Promise<{ keyword: string | string[] }>;
};
export default async function SearchPage({
  searchParams,
}: Readonly<SearchPageProps>) {
  const searchTerm = await getSearchTerm(searchParams);

  if (!searchTerm) {
    return <EmptySearchPrompt />;
  }

  const searchResult = await searchFilms(searchTerm);
  if (!searchResult?.items) {
    return <NoResultsFound />;
  }

  return <SearchResults searchTerm={searchTerm} searchResult={searchResult} />;
}

async function getSearchTerm(
  searchParams: Promise<{ keyword: string | string[] }>
) {
  const { keyword = '' } = (await searchParams) || '';
  return Array.isArray(keyword) ? keyword.join(' ') : keyword;
}

function EmptySearchPrompt() {
  return <p>Vui lòng nhập từ khóa tìm kiếm</p>;
}

function NoResultsFound() {
  return <p>Không tìm thấy kết quả nào</p>;
}

type SearchResultsProps = {
  searchTerm: string;
  searchResult: Omit<IMovieSearchListResponse, 'status'>;
};

function SearchResults({
  searchTerm,
  searchResult,
}: Readonly<SearchResultsProps>) {
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
}
