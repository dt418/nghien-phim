import type { MovieItemBase } from './base-movie-item'
import type { ResponseBase } from './base-response'
import type { Category } from './category'

export interface FilmByCountryResponse extends ResponseBase {
  cat: Category
  items: MovieItemBase[]
}

export interface FilmByCountryProps {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ page: string }>
}
