import { IPagination } from './pagination';

export interface IBaseResponse {
  status: string;
  message?: string;
  paginate: IPagination;
}
