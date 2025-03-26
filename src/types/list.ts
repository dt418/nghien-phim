import type { IMovieItemBase } from './base-movie-item'
import type { IResponseBase } from './base-response'
import type { ICategory } from './category'

export interface IFilmListResponse extends IResponseBase {
  cat: ICategory
  items: IMovieItemBase[]
}

export interface TFilmListProps {
  params: Promise<{ category: string }>
  searchParams?: Promise<{ page: string }>
}
