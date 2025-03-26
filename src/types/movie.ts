import type { IMovieItemBase } from './base-movie-item'

export interface IMovieResponse {
  movie: IMovie
  status: boolean
}

export interface IMovie extends IMovieItemBase {
  id: string
  episodes: IEpisode[]
  category: IMovieCategory
}

export interface IMovieCategory {
  1?: ICategoryItem
  2?: ICategoryItem
  3?: ICategoryItem
  4?: ICategoryItem
}

export interface ICategoryItem {
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

export interface ICountry {
  id: string
  name: string
  slug: string
}

export interface IEpisode {
  server_name: string
  items: IServerData[]
}

export interface IServerData {
  name: string
  slug: string
  m3u8: string
  embed: string
}

export interface IFilmDetailPageProps {
  params: Promise<{
    slug: string | string[]
  }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}
