import { useCallback, useMemo, useState } from 'react';

import { setHeaderCellName } from '../../utils';

import type {
  AutomaticPaginationTableProps,
  CommonTableHelperReturn,
} from '../../interfaces';
import type { ColumnDef } from '@tanstack/react-table';

/**
 * Custom hook that provides helper functions and data for a table.
 *
 * @param T - The type of data in the rows.
 *
 * @param props - The props containing configuration and actions for the table.
 *
 * @returns An object containing helper functions and data for the table.
 */
export const useTableHelper = <T>(
  props: AutomaticPaginationTableProps<T>,
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
   * Defines the table columns based on the data source -
   * {@link https://tanstack.com/table/v8/docs/api/core/column-def | Reference}
   *
   * NOTE: You can also customize it to show the data cell in a chip, button,
   * checkbox input, etc
   */
  const columns = useMemo<Array<ColumnDef<T>>>(
    () =>
      dataSource.length > 0
        ? // @ts-expect-error: Argument of type 'T' is not assignable to
          // parameter of type 'object'
          Object.keys(dataSource[0]).map((prop: string) => ({
            accessorKey: prop,
            header: () => setHeaderCellName(prop),
          }))
        : [],
    [dataSource],
  );

  return { columns, dataSource, error: tableModel.error, fetchDataSource };
};
