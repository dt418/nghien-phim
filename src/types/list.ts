import type { MovieItemBase } from './base-movie-item'
import type { ResponseBase } from './base-response'
import type { Category } from './category'

export interface FilmListResponse extends ResponseBase {
  cat: Category
  items: MovieItemBase[]
}

export interface FilmListProps {
  params: Promise<{ category: string }>
  searchParams?: Promise<{ page: string }>
}
