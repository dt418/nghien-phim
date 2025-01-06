import SearchBreadcrumb from '@/components/ui/search/search-breadcrumb';
import SearchMovieTable from '@/components/ui/search/search-movie-table';
import { Separator } from '@/components/ui/separator';
import { searchFilms } from '@/lib/fetcher';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { keyword?: string };
}) {
  const { keyword = '' } = (await searchParams) || '';
  const searchResult = await searchFilms(keyword);

  if (!searchResult) {
    return <p>Không tìm thấy kết quả nào</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <SearchBreadcrumb
        breadcrumbData={{
          keyword,
          currentPage: searchResult.paginate.current_page,
        }}
      />
      <Separator />
      <h1>TimKiem</h1>
      {keyword ? (
        <p className="uppercase">Kết quả tìm kiếm cho: {keyword}</p>
      ) : (
        <p>Vui lòng nhập từ khóa tìm kiếm</p>
      )}
      <div className="overflow-x-auto">
        <SearchMovieTable data={searchResult.items} />
      </div>
    </div>
  );
}
