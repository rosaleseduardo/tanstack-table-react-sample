import { withControlledPaginationTable } from '../../..';

import { useTableViewModel } from './infrastructure';

import type { Person } from '../../../../interfaces';

export const BasicControlledPaginationTable = (): JSX.Element => {
  const Table = withControlledPaginationTable<Person>();

  return (
    <Table
      // styles={{
      //   position: 'absolute',
      //   left: '50%',
      //   top: '40%',
      //   transform: 'translate(-50%, -40%)',
      // }}
      viewModel={useTableViewModel<Person>}
    />
  );
};
