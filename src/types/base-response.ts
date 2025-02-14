import { IPagination } from './pagination';

export interface IResponseBase {
  status: string;
  message?: string;
  paginate: IPagination;
}
