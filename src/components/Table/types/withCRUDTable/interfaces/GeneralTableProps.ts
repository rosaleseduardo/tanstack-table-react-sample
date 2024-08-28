/**
 * Represents the props for a table component with automatic pagination.
 *
 * @param T - The type of data in the table.
 */
export interface GeneralAutomaticPaginationProps<T> {
  viewModel: () => AutomaticPaginationModel<T>;
  withControlledPagination: false;
}

/**
 * Represents the props for a table component with controlled pagination.
 *
 * @param T - The type of data in the table.
 */
export interface GeneralControlledPaginationProps<T> {
  viewModel: () => ControlledPaginationModel<T>;
  withControlledPagination: true;
}

/**
 * Represents the common props for the view model.
 */
interface CommonPropsViewModelProps {
  loading: boolean;
  error: string;
}

/**
 * Represents the pagination options.
 */
interface PaginationOptions {
  pageIndex: number;
  pageSize: number;
}

/**
 * Represents the view model definition for a table component with automatic
 * pagination.
 *
 * @param T - The type of data in the table.
 */
export interface AutomaticPaginationModel<T> extends CommonPropsViewModelProps {
  list: () => Promise<T[]>;
}

/**
 * Represents the view model definition for a table component with controlled
 * pagination.
 *
 * @param T - The type of data in the table.
 */
export interface ControlledPaginationModel<T>
  extends CommonPropsViewModelProps {
  list: (
    options: PaginationOptions,
  ) => Promise<{ rows: T[]; pageCount: number }>;
}

/**
 * Represents the general props for a table component.
 *
 * @param T - The type of data in the table.
 */
export type GeneralTableProps<T> =
  | GeneralAutomaticPaginationProps<T>
  | GeneralControlledPaginationProps<T>;
