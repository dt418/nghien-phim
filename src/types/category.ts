import { IMovieItemBase } from './base-movie-item';
import { IResponseBase } from './base-response';

export interface ICategoryResponse extends IResponseBase {
  cat: ICategory;
  items: IMovieItemBase[];
}

export interface ICategory {
  name: string;
  title: string;
  slug: string;
}

export type TCategoryPageProps = {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ page: string }>;
};
