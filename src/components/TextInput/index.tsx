import { type TextInputProps } from './interfaces';

export const TextInput = (props: TextInputProps): JSX.Element => (
  <input
    type={props.type}
    defaultValue={props.defaultValue}
    style={props.style}
    onChange={props.onChange}
  />
);
