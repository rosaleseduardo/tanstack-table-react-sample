import { type CommonProps } from '../../interfaces';

export const TableBodyCell = (props: CommonProps): JSX.Element => (
  <td>{props.children}</td>
);
