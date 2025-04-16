import type { MovieItemBase } from './base-movie-item'
import type { ResponseBase } from './base-response'

export interface CategoryResponse extends ResponseBase {
  cat: Category
  items: MovieItemBase[]
}

export interface Category {
  name: string
  slug: string
  title: string
}

export interface CategoryPageProps {
  params: Promise<{ category: string }>
  searchParams?: Promise<{ page: string }>
}
