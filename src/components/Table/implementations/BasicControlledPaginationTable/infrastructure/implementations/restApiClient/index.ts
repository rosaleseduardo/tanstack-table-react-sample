import { fetchData } from '../../fetchData';

import type { Interfaces } from '../../../domain';

export const restApiClient = <T>(): Interfaces.ApiClientReturn<T> => {
  const list = async (
    options: Interfaces.PaginationOptions,
  ): Interfaces.ListtMethodReturn<T> =>
    // @ts-expect-error: Type 'Person[]' is not assignable to type 'T[]'.
    await fetchData(options);

  return { list };
};
