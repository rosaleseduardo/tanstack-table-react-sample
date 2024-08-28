import type { Row, VisibilityState } from '@tanstack/react-table';

/**
 * Optional props for the table component.
 */
export type OptionalTableProps = Partial<{
  styles: Record<string, unknown>;
  /** It hides columns within the table based on the VisibilityState */
  columnVisibilityState: VisibilityState;
  /** Enables the table to come with 'Row Selection' Feature */
  withSelectableRows: boolean;
  withGlobalFilter: boolean;
}>;

/**
 * CRUD actions for the table.
 * @param T - The type of data in the table.
 */
export interface CRUDActions<T> {
  actions: {
    /**
     * Renders the update action for a row in the table.
     *
     * @param row - The row object representing the data.
     *
     * @returns The JSX element representing the update action.
     */
    update: (row: Row<T>) => JSX.Element;
    /**
     * Renders the delete action for a row in the table.
     *
     * @param row - The row object representing the data.
     *
     * @returns The JSX element representing the delete action.
     */
    delete: (row: Row<T>) => JSX.Element;
  };
}
