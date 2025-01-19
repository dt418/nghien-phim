import SearchBreadcrumb from '@/components/ui/search/search-breadcrumb';
import SearchMovieTable from '@/components/ui/search/search-movie-table';
import { Separator } from '@/components/ui/separator';
import { getFilmByCategory } from '@/lib/api';

type CategoryPageProps = {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ page: string }>;
};
export default async function CategoryPage(props: CategoryPageProps) {
  const searchParams = await props.searchParams;
  const { category } = await props.params;
  const decodedCategory = decodeURIComponent(category);
  const page = Number(searchParams?.page ?? 1);
  const { items, cat } = await getFilmByCategory(decodedCategory, page);

  if (!items) {
    return <p>Không tìm thấy kết quả nào</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <SearchBreadcrumb
        breadcrumbData={{
          keyword: cat.title,
          currentPage: page,
        }}
      />
      <Separator />
      <h2 className="uppercase">Kết quả tìm kiếm cho: {cat.title}</h2>
      <div className="overflow-x-auto">
        {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
        <SearchMovieTable data={items} />
      </div>
    </div>
  );
}
