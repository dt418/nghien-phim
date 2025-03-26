import type { IMovieItemBase } from './base-movie-item'
import type { IResponseBase } from './base-response'
import type { ICategory } from './category'

export interface IFilmByYearResponse extends IResponseBase {
  cat: ICategory
  items: IMovieItemBase[]
}

export interface TFilmByYearProps {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ page: string }>
}
