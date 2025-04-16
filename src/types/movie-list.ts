import type { MovieItemBase } from './base-movie-item'
import type { ResponseBase } from './base-response'

export interface MovieListResponse extends ResponseBase {
  items: MovieItemShortened[]
}

export type MovieItemShortened = Pick<
  MovieItemBase,
  'name' | 'slug' | 'original_name' | 'thumb_url' | 'poster_url' | 'modified'
>

export interface HomePageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}
