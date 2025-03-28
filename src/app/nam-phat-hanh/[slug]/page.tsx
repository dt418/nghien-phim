import { AlertCircle } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import SearchBreadcrumb from '@/components/ui/search/search-breadcrumb';
import SearchMovieTable from '@/components/ui/search/search-movie-table';
import { Separator } from '@/components/ui/separator';
import { getFilmByYear } from '@/lib/api';
import { APIError } from '@/lib/api/errors';
import config from '@/lib/config';
import { IMovieItemBase } from '@/types/base-movie-item';
import { ICategory } from '@/types/category';
import { TFilmByYearProps } from '@/types/film-by-year';

export const revalidate = 10;
// generate metadata here
export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const decodedCategory = decodeURIComponent(slug);
  const {
    cat: { title },
    items,
  } = await getFilmByYear(decodedCategory, 1);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Phim phát hành năm ${title}`,
    description: `Xem phim phát hành năm ${title} online với phụ đề tiếng Việt`,
    openGraph: {
      title: `Phim phát hành năm ${title}`,
      description: `Xem phim phát hành năm ${title} online với phụ đề tiếng Việt`,
      images:
        items.length > 0
          ? [String(items[0].poster_url), ...previousImages]
          : previousImages,
      type: 'website',
      url: `${config.NEXT_PUBLIC_BASE_URL}/nam-phat-hanh/${decodedCategory}`,
    },
  };
}

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
  items: IMovieItemBase[];
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
    <h2 className="uppercase">Phim phát hành năm {category.title}</h2>
    <div className="overflow-x-auto">
      <SearchMovieTable data={items} />
    </div>
  </div>
);

export default async function FilmByYearPage(
  props: Readonly<TFilmByYearProps>
) {
  try {
    const searchParams = await props.searchParams;
    const { slug } = await props.params;
    const decodedYear = decodeURIComponent(slug);
    const page = Number(searchParams?.page ?? 1);

    const { items, cat } = await getFilmByYear(decodedYear, page);

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
