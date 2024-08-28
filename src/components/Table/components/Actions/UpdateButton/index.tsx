import type { Row } from '@tanstack/react-table';

export const UpdateButton = <T,>(row: Row<T>): JSX.Element => (
  <button
    onClick={() => {
      alert('Edit onClick handler');
      console.log('Row Info --> ', row.original);
    }}
  >
    Edit
  </button>
);
