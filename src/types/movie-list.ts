import type { IMovieItemBase } from './base-movie-item'
import type { IResponseBase } from './base-response'

export interface IMovieListResponse extends IResponseBase {
  items: TMovieItemShortened[]
}

export type TMovieItemShortened = Pick<
  IMovieItemBase,
  'name' | 'slug' | 'original_name' | 'thumb_url' | 'poster_url' | 'modified'
>

export interface THomePageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}
