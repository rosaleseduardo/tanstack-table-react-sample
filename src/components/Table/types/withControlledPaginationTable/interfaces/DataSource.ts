/**
 * Represents the data source for the table.
 */
export interface DataSource<T> {
  /**
   * An array of data rows.
   */
  rows: T[];

  /**
   * The total number of pages in the data source.
   */
  pageCount: number;
}
