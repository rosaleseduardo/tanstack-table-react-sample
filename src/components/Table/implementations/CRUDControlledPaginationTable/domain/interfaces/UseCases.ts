import type { PaginationOptions, ApiClientReturn } from './ApiClient';

export interface ListUseCaseProps<T> {
  apiClient: ApiClientReturn<T>;
  options: PaginationOptions;
}
