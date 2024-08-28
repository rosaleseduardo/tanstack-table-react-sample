import '../../../../index.css';

import { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

import {
  Pagination,
  TableBody,
  TableBodyCell,
  TableContainer,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../../../../components';
import { DebouncedInput } from '../../components';

import { useTableHelper } from './useTableHelper';

import type { CRUDActions, OptionalTableProps } from '../../../../interfaces';
import type { GeneralControlledPaginationProps } from '../../interfaces';

/**
 * HOC that enhances a component with a controlled pagination table.
 *
 * @param T - The type of data in the table.
 *
 * @param props - The props passed to the enhanced component.
 *
 * @returns The enhanced component.
 */
export const withControlledPaginationTable = <T,>(): ((
  props: GeneralControlledPaginationProps<T> &
    OptionalTableProps &
    CRUDActions<T>,
) => JSX.Element) => {
  const EnhancedComponent = (
    props: GeneralControlledPaginationProps<T> &
      OptionalTableProps &
      CRUDActions<T>,
  ): JSX.Element => {
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [rowSelection, setRowSelection] = useState({});
    const {
      columns,
      dataSource,
      setPagination,
      pagination,
      error,
      fetchDataSource,
      searchGlobally,
    } = useTableHelper<T>({
      actions: props.actions,
      viewModel: props.viewModel,
      withSelectableRows: props.withSelectableRows,
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
        rowSelection,
      },
      /**
       * Enable row selection for all rows
       * or enable row selection conditionally per row
       * enableRowSelection: (row) =\> row.original.age \> 18
       */
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
      onPaginationChange: setPagination,
      onGlobalFilterChange: setGlobalFilter,
      getCoreRowModel: getCoreRowModel(),
      manualPagination: true,
      manualFiltering: props.withGlobalFilter ?? false,
    });

    useEffect(() => {
      if (globalFilter !== '') {
        void searchGlobally();
      } else {
        void fetchDataSource();
      }
    }, [fetchDataSource, globalFilter, searchGlobally]);

    return (
      <div style={props.styles}>
        <div>
          <DebouncedInput
            value={globalFilter}
            onChange={(value) => {
              setGlobalFilter(String(value));
            }}
            placeholder="Search all columns..."
          />
        </div>
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
        {props.withSelectableRows === true && (
          <>
            <br />
            <div>
              {Object.keys(rowSelection).length} of{' '}
              {table.getPreFilteredRowModel().rows.length} Total Rows Selected
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => {
                  console.info('rowSelection', rowSelection);
                }}
              >
                Log `rowSelection` state
              </button>
              <button
                onClick={() => {
                  console.info(
                    'table.getSelectedRowModel().flatRows',
                    table.getSelectedRowModel().flatRows,
                  );
                }}
              >
                Log table.getSelectedRowModel().flatRows
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  return EnhancedComponent;
};
