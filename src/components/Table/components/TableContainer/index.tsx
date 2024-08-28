import { type ChildrenProps } from '../../interfaces';

export const TableContainer = (props: ChildrenProps): JSX.Element => (
  <table>{props.children}</table>
);
