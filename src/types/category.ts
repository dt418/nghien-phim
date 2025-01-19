import { IBaseResponse } from './base-response';

export interface ICategoryResponse extends IBaseResponse {
  cat: ICategory;
  items: ICategoryItem[];
}

export interface ICategory {
  name: string;
  title: string;
  slug: string;
}

export interface ICategoryItem {
  name: string;
  slug: string;
  original_name: string;
  thumb_url: string;
  poster_url: string;
  created: string;
  modified: string;
  description: string;
  total_episodes: number;
  current_episode: string;
  time: string;
  quality: string;
  language: string;
  director?: string;
  casts?: string;
}

export type CategoryPageProps = {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ page: string }>;
};
