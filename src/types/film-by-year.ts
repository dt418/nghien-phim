import { IMovieItemBase } from './base-movie-item';
import { IResponseBase } from './base-response';
import { ICategory } from './category';

export interface IFilmByYearResponse extends IResponseBase {
  cat: ICategory;
  items: IMovieItemBase[];
}

export type TFilmByYearProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ page: string }>;
};
