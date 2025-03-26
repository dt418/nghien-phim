import type { SearchParams } from 'nuqs/server'

import type { IMovieItemBase } from './base-movie-item'
import type { IResponseBase } from './base-response'

export interface IMovieSearchListResponse extends IResponseBase {
  items: IMovieSearchItem[]
}

export interface IMovieSearchItem extends IMovieItemBase {
  id: string
}

export interface TSearchPageProps {
  searchParams: Promise<SearchParams>
}

export interface TSearchResultsProps {
  searchTerm: string
  rawSearchTerm: string
  searchResult: Omit<IMovieSearchListResponse, 'status'>
}
