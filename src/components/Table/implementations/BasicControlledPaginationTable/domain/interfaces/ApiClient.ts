export interface PaginationOptions {
  pageIndex: number;
  pageSize: number;
}

export interface ApiClientReturn<T> {
  list: (options: PaginationOptions) => Promise<{
    rows: T[];
    pageCount: number;
  }>;
}

export type ListtMethodReturn<T> = Promise<{
  rows: T[];
  pageCount: number;
}>;
