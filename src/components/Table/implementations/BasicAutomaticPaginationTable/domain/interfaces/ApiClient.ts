export interface TableApiClientReturn<T> {
  list: () => Promise<{ data: T[] }>;
}
