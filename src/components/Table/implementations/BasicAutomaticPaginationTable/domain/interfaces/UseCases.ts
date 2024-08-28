import type { TableApiClientReturn } from './ApiClient';

export interface ListUseCaseProps<T> {
  apiClient: TableApiClientReturn<T>;
}
