import { useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from '@tanstack/react-table';

import {
  TableBody,
  TableHead,
  TableContainer,
  TableRow,
  TableHeadCell,
  TableBodyCell,
  Pagination,
} from '../../components';

import { useTableHelper } from './useTableHelper';

import type {
  AutomaticPaginationTableProps,
  OptionalTableProps,
} from '../../interfaces';

import '../../index.css';

/**
 * Higher-order component that enhances a table component with automatic
 * pagination functionality.
 *
 * @param T - The type of data in the table.
 *
 * @returns A function that takes props as input and returns a JSX
 * element representing the enhanced table component.
 */

export const withAutomaticPaginationTable = <T,>(): ((
  props: AutomaticPaginationTableProps<T> &
    Omit<OptionalTableProps, 'withGlobalFilter' | 'withSelectableRows'>,
) => JSX.Element) => {
  /**
   * Enhanced component that adds automatic pagination functionality to a table.
   *
   * @param props - The props containing the necessary configurations and data
   * for the table.
   *
   * @returns The JSX element representing the enhanced table component.
   */
  const EnhancedComponent = (
    props: AutomaticPaginationTableProps<T> &
      Omit<OptionalTableProps, 'withGlobalFilter' | 'withSelectableRows'>,
  ): JSX.Element => {
    const { columns, dataSource, error, fetchDataSource } = useTableHelper<T>({
      viewModel: props.viewModel,
    });

    const table = useReactTable<T>({
      initialState: {
        columnVisibility: props.columnVisibilityState,
      },
      data: dataSource,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
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
