import { IMovieItemBase } from './base-movie-item';
import { IResponseBase } from './base-response';
import { ICategory } from './category';

export interface IFilmByCountryResponse extends IResponseBase {
  cat: ICategory;
  items: IMovieItemBase[];
}

export type TFilmByCountryProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ page: string }>;
};
