export const Button = ({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
}): JSX.Element => (
  <button onClick={onClick} disabled={disabled}>
    {children}
  </button>
);
