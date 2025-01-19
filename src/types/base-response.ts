import { IPagination } from './pagination';

export interface IBaseResponse {
  status: string;
  paginate: IPagination;
}
