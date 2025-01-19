import { IBaseResponse } from './base-response';
import { IMovieBase } from './movie-list';

export interface IMovieSearchListResponse extends IBaseResponse {
  items: IMovieSearchItem[];
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
