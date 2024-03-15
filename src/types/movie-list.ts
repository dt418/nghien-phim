export interface IMovieListResponse {
  status: string;
  items: IMovieBase[];
  paginate: IPagination;
}

export interface IMovieBase {
  name: string;
  slug: string;
  original_name: string;
  thumb_url: string;
  poster_url: string;
  modified: string;
}

export interface IPagination {
  current_page: number;
  total_page: number;
  total_items: number;
  items_per_page: number;
}
