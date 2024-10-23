export interface IMovieResponse {
  status: boolean;
  movie: IMovie;
}

export interface IMovie {
  id: string;
  name: string;
  slug: string;
  original_name: string;
  thumb_url: string;
  poster_url: string;
  created: string;
  modified: string;
  description: string;
  total_episodes: number;
  current_episode: string;
  time: string;
  quality: string;
  language: string;
  director: string;
  casts: string;
  category: ICategory;
  episodes: IEpisode[];
}

export interface ICategory {
  "1"?: ICategoryItem;
  "2"?: ICategoryItem;
  "3"?: ICategoryItem;
  "4"?: ICategoryItem;
}

export interface ICategoryItem {
  group: Group;
  list: List[];
}

export interface Group {
  id: string;
  name: string;
}

export interface List {
  id: string;
  name: string;
}

export interface ICountry {
  id: string;
  name: string;
  slug: string;
}

export interface IEpisode {
  server_name: string;
  items: IServerData[];
}

export interface IServerData {
  name: string;
  slug: string;
  embed: string;
  m3u8: string;
}

export interface IFilmDetailPageProps {
  params: Promise<{
    slug: string | string[];
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}
