export interface PagingResponse<T> {
  totalCount: number;
  value: T[];
}
