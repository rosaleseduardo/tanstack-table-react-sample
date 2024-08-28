import { useState } from 'react';

import { restApiClient } from '../../implementations';
import { USE_CASES } from '../../../application';

import type { ControlledPaginationModel } from '../../../../../interfaces';
import type { Interfaces } from '../../../domain';

export const useTableViewModel = <T>(): ControlledPaginationModel<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const apiClient = restApiClient<T>();

  const list = async (
    options: Interfaces.PaginationOptions,
  ): Interfaces.ListtMethodReturn<T> => {
    setLoading(true);

    try {
      const response = await USE_CASES.list<T>({
        apiClient,
        options,
      });

      return response;
    } catch (error) {
      setError('There was an error fetching data');

      return {
        rows: [],
        pageCount: -1,
      };
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
