import { type Props } from './interfaces';

export const TableHeadCell = (props: Props): JSX.Element => (
  <th colSpan={props.colSpan}>{props.children}</th>
);
