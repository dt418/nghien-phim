export interface IMovieListResponse {
  status: string;
  items: IMovieBase[];
  paginate: IPagination;
}

export interface IMovieSearchListResponse {
  status: string;
  items: IMovieSearchItem[];
  paginate: IPagination;
}

export interface IMovieBase {
  name: string;
  slug: string;
  original_name: string;
  thumb_url: string;
  poster_url: string;
  modified: string;
}

export interface IMovieSearchItem extends IMovieBase {
  id: string;
  created: string;
  description: string;
  total_episodes: number;
  current_episode: string;
  time: string | null;
  quality: string;
  language: string;
  director: string | null;
  casts: string | null;
}

export interface IPagination {
  current_page: number;
  total_page: number;
  total_items: number;
  items_per_page: number;
}

export type THomePageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
