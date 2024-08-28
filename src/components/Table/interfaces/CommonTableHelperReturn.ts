import type { ColumnDef } from '@tanstack/react-table';

/**
 * Represents the return type of a common table helper function.
 *
 * @param T - The type of data in the table.
 */
export interface CommonTableHelperReturn<T> {
  /**
   * An array of column definitions for the table.
   */
  columns: Array<ColumnDef<T>>;
  /**
   * The data source for the table.
   */
  dataSource: T[];
  /**
   * The error message, if any.
   */
  error: string;
  /**
   * Function to fetch the data source for the table.
   *
   * @returns A promise that resolves when the data source is fetched.
   */
  fetchDataSource: () => Promise<void>;
}
