export interface SelectProps {
  onChange: (e: any) => void;
  value: number | string;
  options: string[] | number[];
}
