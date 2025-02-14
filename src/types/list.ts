import { IMovieItemBase } from './base-movie-item';
import { IResponseBase } from './base-response';
import { ICategory } from './category';

export interface IFilmListResponse extends IResponseBase {
  cat: ICategory;
  items: IMovieItemBase[];
}

export type TFilmListProps = {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ page: string }>;
};
