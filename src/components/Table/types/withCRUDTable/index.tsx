import '../../index.css';

import {
  withAutomaticPaginationTable,
  withControlledPaginationTable,
} from './hocs';

import type { OptionalTableProps, CRUDActions } from '../../interfaces';
import type { GeneralTableProps } from './interfaces';

/**
 * Higher-order function that enhances a table component with CRUD
 * functionality.
 *
 * @param T - The type of data in the table.
 *
 * @returns A function that accepts props and returns the enhanced table
 * component JSX element.
 */
export const withCRUDTable = <T extends object>(): ((
  props: GeneralTableProps<T> & OptionalTableProps & CRUDActions<T>,
) => JSX.Element) => {
  /**
   * Enhanced component that wraps the table component and handles conditional
   * rendering based on the `withControlledPagination` prop.
   *
   * @param props - The props passed to the enhanced component.
   *
   * @returns The enhanced table component JSX element.
   */
  const EnhancedComponent = (
    props: GeneralTableProps<T> & OptionalTableProps & CRUDActions<T>,
  ): JSX.Element => {
    if (!props.withControlledPagination) {
      const AutomaticPaginationTable = withAutomaticPaginationTable<T>();

      return (
        <AutomaticPaginationTable
          viewModel={props.viewModel}
          styles={props.styles}
          actions={props.actions}
          columnVisibilityState={props.columnVisibilityState}
          withControlledPagination={props.withControlledPagination}
          withSelectableRows={props.withSelectableRows}
        />
      );
    } else {
      const ControlledPaginationTable = withControlledPaginationTable<T>();

      return (
        <ControlledPaginationTable
          viewModel={props.viewModel}
          styles={props.styles}
          actions={props.actions}
          columnVisibilityState={props.columnVisibilityState}
          withControlledPagination={props.withControlledPagination}
          withSelectableRows={props.withSelectableRows}
          withGlobalFilter={props.withGlobalFilter}
        />
      );
    }
  };

  return EnhancedComponent;
};
