import { makeData } from '../makeData';

import type { Interfaces } from '../../domain';

export const restApiClient = <T>(): Interfaces.TableApiClientReturn<T> => {
  const list = async (): Promise<{ data: T[] }> => ({
    data: makeData<T>(30),
  });

  return { list };
};
