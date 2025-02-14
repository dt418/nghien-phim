import { IMovieItemBase } from './base-movie-item';
import { IResponseBase } from './base-response';

export interface IMovieSearchListResponse extends IResponseBase {
  items: IMovieSearchItem[];
}

export interface IMovieSearchItem extends IMovieItemBase {
  id: string;
}
