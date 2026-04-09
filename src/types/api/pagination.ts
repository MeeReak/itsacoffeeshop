export interface PaginatedResponse<T> {
  totalCount: number;
  nextLink: string | null;
  value: T[];
}
