import { useState } from 'react';

import { restApiClient } from '../../../infrastructure';
import { USE_CASES } from '../../../application';

import type { AutomaticPaginationModel } from '../../../../../interfaces';

export const useTableViewModel = <T>(): AutomaticPaginationModel<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const apiClient = restApiClient<T>();

  const list = async (): Promise<T[]> => {
    setLoading(true);

    try {
      return await USE_CASES.list({
        apiClient,
      });
    } catch (error) {
      setError('There was an error fetching data');

      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    list,
    loading,
    error,
  };
};
