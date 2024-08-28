import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import '../../index.css';
import { useEffect } from 'react';

import {
  Pagination,
  TableBody,
  TableBodyCell,
  TableContainer,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../../components';

import { useTableHelper } from './useTableHelper';

import type {
  ControlledPaginationTableProps,
  OptionalTableProps,
} from '../../interfaces';

/**
 * Higher-order component that enhances a table component with controlled
 * pagination.
 *
 * @param T - The type of data in the table rows.
 *
 * @returns A function that accepts the table props and returns the
 * enhanced table component.
 */
export const withControlledPaginationTable = <T,>(): ((
  props: ControlledPaginationTableProps<T> &
    Omit<OptionalTableProps, 'withGlobalFilter' | 'withSelectableRows'>,
) => JSX.Element) => {
  const EnhancedComponent = (
    props: ControlledPaginationTableProps<T> &
      Omit<OptionalTableProps, 'withGlobalFilter' | 'withSelectableRows'>,
  ): JSX.Element => {
    const { columns, dataSource, setPagination, pagination, fetchDataSource } =
      useTableHelper<T>({
        viewModel: props.viewModel,
      });

    const table = useReactTable<T>({
      initialState: {
        columnVisibility: props.columnVisibilityState,
      },
      data: dataSource.rows,
      columns,
      pageCount: dataSource.pageCount,
      state: {
        pagination,
      },
      onPaginationChange: setPagination,
      getCoreRowModel: getCoreRowModel(),
      manualPagination: true,
    });

    useEffect(() => {
      void fetchDataSource();
    }, [fetchDataSource]);

    return (
      <div style={props.styles}>
        <TableContainer>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeadCell key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </>
                    )}
                  </TableHeadCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableBodyCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableBodyCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
        <Pagination table={table} />
      </div>
    );
  };

  return EnhancedComponent;
};
