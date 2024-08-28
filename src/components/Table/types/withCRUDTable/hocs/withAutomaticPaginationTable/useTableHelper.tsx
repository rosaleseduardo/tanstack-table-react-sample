import { useCallback, useMemo, useState } from 'react';

import { Checkbox } from '../../../../components';
import { setHeaderCellName } from '../../../../utils';

import type { ColumnDef, Row, Table } from '@tanstack/react-table';
import type {
  CommonTableHelperReturn,
  CRUDActions,
  OptionalTableProps,
} from '../../../../interfaces';
import type { GeneralAutomaticPaginationProps } from '../../interfaces';

/**
 * Custom hook that provides helper functions and data for a table.
 *
 * @param T - The type of data in the rows.
 *
 * @param props - The props containing configuration and actions for the table.
 *
 * @returns An object containing helper functions and data for the table.
 */
export const useTableHelper = <T,>(
  props: Omit<GeneralAutomaticPaginationProps<T>, 'withControlledPagination'> &
    Omit<OptionalTableProps, 'withGlobalFilter'> &
    CRUDActions<T>,
): CommonTableHelperReturn<T> => {
  const tableModel = props.viewModel();
  const [dataSource, setDataSource] = useState<T[]>([]);

  /**
   * Fetches the data source for the table.
   */
  const fetchDataSource = useCallback(async () => {
    const response = await tableModel.list();

    setDataSource(response);
  }, []);

  /**
   * Determines the visible columns based on the data source.
   *
   * @param dataSource - The data source for the table.
   *
   * @returns An array of column keys.
   */
  const visibleColumns = useCallback(
    (dataSource: T[]): string[] =>
      props.withSelectableRows === true
        ? // @ts-expect-error: Argument of type 'T' is not assignable to
          // parameter of type 'object'
          ['select', ...Object.keys(dataSource[0]), 'actions']
        : // @ts-expect-error: Argument of type 'T' is not assignable to
          // parameter of type 'object'
          [...Object.keys(dataSource[0]), 'actions'],
    [props.withSelectableRows],
  );

  /**
   * Defines the table columns based on the data source -
   * {@link https://tanstack.com/table/v8/docs/api/core/column-def | Reference}
   *
   * NOTE: You can also customize it to show the data cell in a chip, button,
   * checkbox input, etc
   */
  const columns = useMemo<Array<ColumnDef<T>>>(
    () =>
      dataSource.length > 0
        ? visibleColumns(dataSource).map((prop: string) => {
            if (prop === 'select')
              return {
                id: prop,
                header: ({ table }: { table: Table<T> }) => (
                  <Checkbox
                    {...{
                      checked: table.getIsAllRowsSelected(),
                      indeterminate: table.getIsSomeRowsSelected(),
                      onChange: table.getToggleAllRowsSelectedHandler(),
                    }}
                  />
                ),
                cell: ({ row }: { row: Row<T> }) => (
                  <Checkbox
                    {...{
                      checked: row.getIsSelected(),
                      disabled: !row.getCanSelect(),
                      indeterminate: row.getIsSomeSelected(),
                      onChange: row.getToggleSelectedHandler(),
                    }}
                  />
                ),
              };

            if (prop === 'actions')
              return {
                id: prop,
                header: () => setHeaderCellName(prop),
                cell: ({ row }: { row: Row<T> }) => (
                  <span>
                    {props.actions.update(row)}
                    {props.actions.delete(row)}
                  </span>
                ),
              };

            return {
              accessorKey: prop,
              header: () => setHeaderCellName(prop),
            };
          })
        : [],
    [dataSource, props.actions, visibleColumns],
  );

  return {
    columns,
    dataSource,
    error: tableModel.error,
    fetchDataSource,
  };
};
