import { SearchParams } from 'nuqs/server';

import { IMovieItemBase } from './base-movie-item';
import { IResponseBase } from './base-response';

export interface IMovieSearchListResponse extends IResponseBase {
  items: IMovieSearchItem[];
}

export interface IMovieSearchItem extends IMovieItemBase {
  id: string;
}

export type TSearchPageProps = {
  searchParams: Promise<SearchParams>;
};

export type TSearchResultsProps = {
  searchTerm: string;
  rawSearchTerm: string;
  searchResult: Omit<IMovieSearchListResponse, 'status'>;
};
