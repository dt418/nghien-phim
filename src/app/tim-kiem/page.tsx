import type { Metadata, ResolvingMetadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { loadSearchParams } from '~/components/ui/header/page-search-params'
import NoResult from '~/components/ui/search/no-result'
import SearchBreadcrumb from '~/components/ui/search/search-breadcrumb'
import SearchMovieTable from '~/components/ui/search/search-movie-table'
import { Separator } from '~/components/ui/separator'

import { searchFilms } from '~/lib/api'
import config from '~/lib/config'

import type { SearchPageProps, SearchResultsProps } from '~/types/search'

export const revalidate = 10

/**
 * Renders search results including breadcrumb, title and movie table
 */
function SearchResults({
  searchTerm,
  searchResult,
  rawSearchTerm,
}: Readonly<SearchResultsProps>) {
  const {
    items,
    paginate: { current_page = 1 },
  } = searchResult

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col gap-4">
      <SearchBreadcrumb
        breadcrumbData={{
          keyword: searchTerm,
          rawKeyword: rawSearchTerm,
          currentPage: current_page,
        }}
      />
      <Separator />
      <h2 className="text-xl font-semibold uppercase">
        Kết quả tìm kiếm cho:
        {' '}
        {rawSearchTerm}
      </h2>
      <div className="flex-1 overflow-x-auto">
        <SearchMovieTable data={items} />
      </div>
    </div>
  )
}

export async function generateMetadata(
  { searchParams }: SearchPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { keyword } = await loadSearchParams(searchParams)

  if (!keyword) {
    redirect('/')
  }

  const cookiesStore = await cookies()
  const rawKeyword = cookiesStore.get('keyword')?.value ?? keyword
  const { items } = await searchFilms(keyword)
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `Tìm kiếm phim: ${rawKeyword}`,
    description: `Xem danh sách phim theo từ khóa ${rawKeyword} online với phụ đề tiếng Việt`,
    openGraph: {
      title: `Tìm kiếm phim: ${rawKeyword}`,
      description: `Xem danh sách phim theo từ khóa ${rawKeyword} online với phụ đề tiếng Việt`,
      images:
        items.length > 0
          ? [String(items[0].poster_url), ...previousImages]
          : previousImages,
      url: `${config.NEXT_PUBLIC_BASE_URL}/tim-kiem?keyword=${keyword}`,
    },
  }
}

/**
 * Main search page component
 * Handles search term extraction and result fetching
 */
export default async function SearchPage({
  searchParams,
}: Readonly<SearchPageProps>) {
  const { keyword } = await loadSearchParams(searchParams)

  if (!keyword) {
    redirect('/')
  }

  const cookiesStore = await cookies()
  const rawKeyword = cookiesStore.has('keyword')
    ? (cookiesStore.get('keyword')?.value as string)
    : keyword

  const searchResult = await searchFilms(keyword)
  if (!searchResult || searchResult?.items.length === 0) {
    return <NoResult />
  }

  return (
    <main className="container mx-auto min-h-screen px-4 py-6">
      <SearchResults
        searchTerm={keyword}
        searchResult={searchResult}
        rawSearchTerm={rawKeyword}
      />
    </main>
  )
}
