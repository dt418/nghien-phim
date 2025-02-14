import { IMovieItemBase } from './base-movie-item';
import { IResponseBase } from './base-response';
export interface IMovieListResponse extends IResponseBase {
  items: TMovieItemShortened[];
}

export type TMovieItemShortened = Pick<
  IMovieItemBase,
  'name' | 'slug' | 'original_name' | 'thumb_url' | 'poster_url' | 'modified'
>;

export type THomePageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
