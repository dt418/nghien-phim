import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import SearchBreadcrumb from '@/components/ui/search/search-breadcrumb';
import SearchMovieTable from '@/components/ui/search/search-movie-table';
import { Separator } from '@/components/ui/separator';
import { getFilmByCategory } from '@/lib/api';
import { APIError } from '@/lib/api/errors';
import { CategoryPageProps, ICategory, ICategoryItem } from '@/types/category';

// Component to display error messages
const ErrorAlert = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Alert variant="destructive" className="my-4">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>{title}</AlertTitle>
    <AlertDescription>{description}</AlertDescription>
  </Alert>
);

// Component to display empty state
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center p-8">
    <p className="text-lg text-gray-600">Không tìm thấy kết quả nào</p>
  </div>
);

// Component to display search results
const SearchResults = ({
  items,
  category,
  page,
}: {
  items: ICategoryItem[];
  category: Pick<ICategory, 'title'>;
  page: number;
}) => (
  <div className="flex flex-col gap-4">
    <SearchBreadcrumb
      breadcrumbData={{
        keyword: category.title,
        currentPage: page,
      }}
    />
    <Separator />
    <h2 className="uppercase">Kết quả tìm kiếm cho: {category.title}</h2>
    <div className="overflow-x-auto">
      <SearchMovieTable data={items} />
    </div>
  </div>
);

export default async function CategoryPage(props: CategoryPageProps) {
  try {
    const searchParams = await props.searchParams;
    const { category } = await props.params;
    const decodedCategory = decodeURIComponent(category);
    const page = Number(searchParams?.page ?? 1);

    const { items, cat } = await getFilmByCategory(decodedCategory, page);

    if (!items || items.length === 0) {
      return <EmptyState />;
    }

    return <SearchResults items={items} category={cat} page={page} />;
  } catch (error) {
    if (error instanceof APIError) {
      return <ErrorAlert title="Lỗi" description={error.message} />;
    }

    return (
      <ErrorAlert title="Đã xảy ra lỗi" description="Vui lòng thử lại sau" />
    );
  }
}