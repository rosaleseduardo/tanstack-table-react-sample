import type { Interfaces } from '../../../domain';

export const list = <T>(props: Interfaces.ListAdapterProps<T>): T[] =>
  props.data;
