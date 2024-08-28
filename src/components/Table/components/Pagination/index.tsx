import { Button, Select, TextInput } from '../../..';
import { DEFAULT_PAGE_SIZES } from '../../constants';

import { type PaginationProps } from './interfaces';

import {} from '../../../';

export const Pagination = <T,>({ table }: PaginationProps<T>): JSX.Element => (
  <div style={{ display: 'flex', gap: '0.5rem' }}>
    <Button
      onClick={() => {
        table.setPageIndex(0);
      }}
      disabled={!table.getCanPreviousPage()}
    >
      {'<<'}
    </Button>
    <Button
      onClick={() => {
        table.previousPage();
      }}
      disabled={!table.getCanPreviousPage()}
    >
      {'<'}
    </Button>
    <Button
      onClick={() => {
        table.nextPage();
      }}
      disabled={!table.getCanNextPage()}
    >
      {'>'}
    </Button>
    <Button
      onClick={() => {
        table.setPageIndex(table.getPageCount() - 1);
      }}
      disabled={!table.getCanNextPage()}
    >
      {'>>'}
    </Button>
    <span style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      Page
      <strong>
        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </strong>
    </span>
    <span style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      | Go to page:
      <TextInput
        type="number"
        defaultValue={table.getState().pagination.pageIndex + 1}
        style={{ width: '5rem' }}
        onChange={(e) => {
          const page =
            e.target.value.length > 0 ? Number(e.target.value) - 1 : 0;
          table.setPageIndex(page);
        }}
      />
    </span>
    <Select
      value={table.getState().pagination.pageSize}
      options={DEFAULT_PAGE_SIZES}
      onChange={(e) => {
        table.setPageSize(Number(e.target.value));
      }}
    />
  </div>
);
