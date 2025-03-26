import type { IMovieItemBase } from './base-movie-item'
import type { IResponseBase } from './base-response'

export interface ICategoryResponse extends IResponseBase {
  cat: ICategory
  items: IMovieItemBase[]
}

export interface ICategory {
  name: string
  slug: string
  title: string
}

export interface TCategoryPageProps {
  params: Promise<{ category: string }>
  searchParams?: Promise<{ page: string }>
}
