import { type CommonTableHelperReturn } from '../../../../../interfaces';

import type { PaginationState } from '@tanstack/react-table';
import type { PaginationOptions, DataSource } from '.';

/**
 * The return type of the table helper hook.
 *
 * @param T - The type of data in the table.
 */
export interface TableHelperReturn<T>
  extends Pick<CommonTableHelperReturn<T>, 'columns'> {
  dataSource: DataSource<T>;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  pagination: PaginationOptions;
  error: string;
  fetchDataSource: () => Promise<void>;
  searchGlobally: () => Promise<void>;
}
