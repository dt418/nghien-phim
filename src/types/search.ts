import type { SearchParams } from 'nuqs/server'

import type { MovieItemBase } from './base-movie-item'
import type { ResponseBase } from './base-response'

export interface MovieSearchListResponse extends ResponseBase {
  items: MovieSearchItem[]
}

export interface MovieSearchItem extends MovieItemBase {
  id: string
}

export interface SearchPageProps {
  searchParams: Promise<SearchParams>
}

export interface SearchResultsProps {
  searchTerm: string
  rawSearchTerm: string
  searchResult: Omit<MovieSearchListResponse, 'status'>
}
