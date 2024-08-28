import { ADAPTERS } from '../../adapters';

import type { Interfaces } from '../../../domain';

export async function list<T>(
  props: Interfaces.ListUseCaseProps<T>,
): Promise<T[]> {
  const result = await props.apiClient.list();

  const adaptedResult = ADAPTERS.list<T>(result);

  return adaptedResult;
}
