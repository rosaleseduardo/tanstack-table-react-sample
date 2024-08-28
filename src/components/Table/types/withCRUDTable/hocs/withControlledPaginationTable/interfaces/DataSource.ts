/**
 * Represents the data source for a table.
 *
 * @param T - The type of data in the rows.
 */
export interface DataSource<T> {
  /**
   * An array of rows containing the data.
   */
  rows: T[];

  /**
   * The total number of pages in the data source.
   */
  pageCount: number;
}
