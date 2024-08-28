import { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from '@tanstack/react-table';

import {
  Checkbox,
  TableBody,
  TableHead,
  TableContainer,
  TableRow,
  TableHeadCell,
  TableBodyCell,
  Pagination,
} from '../../../../components';

import { useTableHelper } from './useTableHelper';

import type { CRUDActions, OptionalTableProps } from '../../../../interfaces';
import type { GeneralAutomaticPaginationProps } from '../../interfaces';

import '../../../../index.css';

/**
 * Higher-order component that enhances a component with automatic pagination
 * functionality.
 *
 * @param T - The type of data in the rows.
 *
 * @returns The enhanced component.
 */
export const withAutomaticPaginationTable = <T,>(): ((
  props: GeneralAutomaticPaginationProps<T> &
    Omit<OptionalTableProps, 'withGlobalFilter'> &
    CRUDActions<T>,
) => JSX.Element) => {
  const EnhancedComponent = (
    props: GeneralAutomaticPaginationProps<T> &
      Omit<OptionalTableProps, 'withGlobalFilter'> &
      CRUDActions<T>,
  ): JSX.Element => {
    const [rowSelection, setRowSelection] = useState({});
    const { columns, dataSource, error, fetchDataSource } = useTableHelper<T>({
      actions: props.actions,
      viewModel: props.viewModel,
      withSelectableRows: props.withSelectableRows,
    });

    const table = useReactTable<T>({
      initialState: {
        columnVisibility: props.columnVisibilityState,
      },
      data: dataSource,
      columns,
      state: {
        rowSelection,
      },
      /**
       * Enable row selection for all rows
       * or enable row selection conditionally per row
       * enableRowSelection: (row) =\> row.original.age \> 18
       */
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });

    useEffect(() => {
      void fetchDataSource();
    }, [fetchDataSource]);

    return (
      <div style={props?.styles}>
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
          {props.withSelectableRows === true && (
            <tfoot>
              <tr>
                <td>
                  <Checkbox
                    {...{
                      checked: table.getIsAllPageRowsSelected(),
                      indeterminate: table.getIsSomePageRowsSelected(),
                      onChange: table.getToggleAllPageRowsSelectedHandler(),
                    }}
                  />
                </td>
                <td colSpan={20}>
                  Page Rows ({table.getRowModel().rows.length})
                </td>
              </tr>
            </tfoot>
          )}
        </TableContainer>
        <div />
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
