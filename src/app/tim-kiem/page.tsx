import SearchBreadcrumb from '@/components/ui/search/search-breadcrumb';
import SearchMovieTable from '@/components/ui/search/search-movie-table';
import { Separator } from '@/components/ui/separator';
import { searchFilms } from '@/lib/fetcher';

type SearchPageProps = {
  searchParams: Promise<{ keyword: string | string[] }>;
};
export default async function SearchPage({
  searchParams,
}: Readonly<SearchPageProps>) {
  const { keyword = '' } = (await searchParams) || '';
  const searchTerm = Array.isArray(keyword) ? keyword.join(' ') : keyword;
  const searchResult = await searchFilms(searchTerm);

  if (!searchResult) {
    return <p>Không tìm thấy kết quả nào</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <SearchBreadcrumb
        breadcrumbData={{
          keyword: searchTerm ?? '',
          currentPage: searchResult.paginate.current_page ?? 1,
        }}
      />
      <Separator />
      {keyword ? (
        <h2 className="uppercase">Kết quả tìm kiếm cho: {keyword}</h2>
      ) : (
        <p>Vui lòng nhập từ khóa tìm kiếm</p>
      )}
      <div className="overflow-x-auto">
        <SearchMovieTable data={searchResult.items} />
      </div>
    </div>
  );
}
