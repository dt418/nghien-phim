import type { MovieItemBase } from './base-movie-item'
import type { ResponseBase } from './base-response'
import type { Category } from './category'

export interface FilmByYearResponse extends ResponseBase {
  cat: Category
  items: MovieItemBase[]
}

export interface FilmByYearProps {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ page: string }>
}
