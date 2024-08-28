import type { Row } from '@tanstack/react-table';

export const DeleteButton = <T,>(row: Row<T>): JSX.Element => (
  <button
    onClick={() => {
      alert('Delete onClick handler');
      console.log('Row Info --> ', row.original);
    }}
  >
    Delete
  </button>
);
