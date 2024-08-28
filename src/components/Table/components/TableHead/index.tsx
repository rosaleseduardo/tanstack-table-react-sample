import { type ChildrenProps } from '../../interfaces';

export const TableHead = (props: ChildrenProps): JSX.Element => (
  <thead>{props.children}</thead>
);
