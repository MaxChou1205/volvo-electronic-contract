export interface ApiResponse<T> {
  data: T;
}

export interface ApiPaginationResponse<T> {
  items: T[];
  totalCount: number;
  totalPage: number;
}
