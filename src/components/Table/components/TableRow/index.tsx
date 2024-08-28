import { type CommonProps } from '../../interfaces';

export const TableRow = (props: CommonProps): JSX.Element => (
  <tr>{props.children}</tr>
);
