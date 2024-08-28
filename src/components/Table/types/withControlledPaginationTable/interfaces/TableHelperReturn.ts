import type { PaginationState } from '@tanstack/react-table';
import type { CommonTableHelperReturn } from '../../../interfaces';
import type { PaginationOptions, DataSource } from '.';

/**
 * Represents the return type of the table helper.
 *
 * @param T - The type of data in the table.
 */
export interface TableHelperReturn<T>
  extends Pick<CommonTableHelperReturn<T>, 'columns'> {
  /**
   * The data source for the table.
   */
  dataSource: DataSource<T>;

  /**
   * A function to set the pagination state.
   */
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;

  /**
   * The current pagination options.
   */
  pagination: PaginationOptions;

  /**
   * An error message, if any.
   */
  error: string;

  /**
   * A function that fetches the data source for the table asynchronously.
   */
  fetchDataSource: () => Promise<void>;
}
