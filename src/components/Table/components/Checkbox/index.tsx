import React, { type HTMLProps } from 'react';

export function Checkbox({
  indeterminate,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>): JSX.Element {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !(rest.checked ?? false) && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <input type="checkbox" ref={ref} {...rest} style={{ cursor: 'pointer' }} />
  );
}
