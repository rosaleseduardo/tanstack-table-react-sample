import type { Interfaces } from '../../../domain';

export async function list<T>({
  apiClient,
  options,
}: Interfaces.ListUseCaseProps<T>): Interfaces.ListtMethodReturn<T> {
  return await apiClient.list(options);
}
