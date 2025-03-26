import type { IMovieItemBase } from './base-movie-item'
import type { IResponseBase } from './base-response'
import type { ICategory } from './category'

export interface IFilmByCountryResponse extends IResponseBase {
  cat: ICategory
  items: IMovieItemBase[]
}

export interface TFilmByCountryProps {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ page: string }>
}
