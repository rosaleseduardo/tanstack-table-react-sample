import { type SelectProps } from './interfaces';

export const Select = (props: SelectProps): JSX.Element => (
  <select value={props.value} onChange={props.onChange}>
    {props.options.map((option, index) => (
      <option key={`${option}-${index}`} value={option}>
        Show {option}
      </option>
    ))}
  </select>
);
