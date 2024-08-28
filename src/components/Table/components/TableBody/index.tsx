import { type ChildrenProps } from '../../interfaces';

export const TableBody = (props: ChildrenProps): JSX.Element => (
  <tbody>{props.children}</tbody>
);
