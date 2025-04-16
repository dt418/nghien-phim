import type { Pagination } from './pagination'

export interface ResponseBase {
  status: string
  message?: string
  paginate: Pagination
}
