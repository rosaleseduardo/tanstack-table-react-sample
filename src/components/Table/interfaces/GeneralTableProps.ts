/**
 * Common props for the view model.
 */
interface CommonPropsViewModelProps {
  loading: boolean;
  error: string;
}

/**
 * Pagination options for controlled pagination.
 */
interface PaginationOptions {
  pageIndex: number;
  pageSize: number;
}

/**
 * Model for automatic pagination.
 *
 * @param T - The type of data in the model.
 */
export interface AutomaticPaginationModel<T> extends CommonPropsViewModelProps {
  /**
   * Retrieves the list of data.
   *
   * @returns A promise that resolves to an array of data.
   */
  list: () => Promise<T[]>;
}

/**
 * Model for controlled pagination.
 *
 * @param T - The type of data in the model.
 */
export interface ControlledPaginationModel<T>
  extends CommonPropsViewModelProps {
  /**
   * Retrieves the list of data based on pagination options.
   *
   * @param options - The pagination options.
   *
   * @returns A promise that resolves to an object containing the data rows and
   * page count.
   */
  list: (
    options: PaginationOptions,
  ) => Promise<{ rows: T[]; pageCount: number }>;
}

/**
 * Props for the automatic pagination table.
 *
 * @param T - The type of data in the table.
 */
export interface AutomaticPaginationTableProps<T> {
  /**
   * Function that returns the view model for the table.
   */
  viewModel: () => AutomaticPaginationModel<T>;
}

/**
 * Props for the controlled pagination table.
 *
 * @param T - The type of data in the table.
 */
export interface ControlledPaginationTableProps<T> {
  /**
   * Function that returns the view model for the table.
   */
  viewModel: () => ControlledPaginationModel<T>;
}
