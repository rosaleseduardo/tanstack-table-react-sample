import React, { useCallback, useMemo, useState } from 'react';

import { setHeaderCellName } from '../../utils';

import type { TableHelperReturn, DataSource } from './interfaces';
import type { ControlledPaginationTableProps } from '../../interfaces';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';

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
  props: ControlledPaginationTableProps<T>,
): TableHelperReturn<T> => {
  const tableModel = props.viewModel();
  const [dataSource, setDataSource] = useState<DataSource<T>>({
    rows: [],
    pageCount: -1,
  });
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const fetchDataOptions = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  /**
   * Fetches the data source for the table.
   */
  const fetchDataSource = useCallback(async () => {
    const response = await tableModel.list(fetchDataOptions);

    setDataSource(response);
  }, [fetchDataOptions]);

  /**
   * Defines the table columns based on the data source -
   * {@link https://tanstack.com/table/v8/docs/api/core/column-def | Reference}
   *
   * NOTE: You can also customize it to show the data cell in a chip, button,
   * checkbox input, etc
   */
  const columns = useMemo<Array<ColumnDef<T>>>(
    () =>
      dataSource.rows.length > 0
        ? // @ts-expect-error: Argument of type 'T' is not assignable to
          // parameter of type 'object'
          Object.keys(dataSource.rows[0]).map((prop: string) => ({
            accessorKey: prop,
            header: () => setHeaderCellName(prop),
          }))
        : [],
    [dataSource.rows],
  );

  return {
    columns,
    dataSource,
    setPagination,
    pagination,
    error: tableModel.error,
    fetchDataSource,
  };
};
