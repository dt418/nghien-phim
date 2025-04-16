import type { MovieItemBase } from './base-movie-item'

export interface MovieResponse {
  movie: Movie
  status: boolean
}

export interface Movie extends MovieItemBase {
  id: string
  episodes: Episode[]
  category: MovieCategory
}

export interface MovieCategory {
  1?: CategoryItem
  2?: CategoryItem
  3?: CategoryItem
  4?: CategoryItem
}

export interface CategoryItem {
  group: Group
  list: List[]
}

export interface Group {
  id: string
  name: string
}

export interface List {
  id: string
  name: string
}

export interface Country {
  id: string
  name: string
  slug: string
}

export interface Episode {
  server_name: string
  items: ServerData[]
}

export interface ServerData {
  name: string
  slug: string
  m3u8: string
  embed: string
}

export interface FilmDetailPageProps {
  params: Promise<{
    slug: string | string[]
  }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}
