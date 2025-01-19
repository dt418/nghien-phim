import { IBaseResponse } from './base-response';
export interface IMovieListResponse extends IBaseResponse {
  items: IMovieBase[];
}

export interface IMovieBase {
  name: string;
  slug: string;
  original_name: string;
  thumb_url: string;
  poster_url: string;
  modified: string;
}

export type THomePageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
