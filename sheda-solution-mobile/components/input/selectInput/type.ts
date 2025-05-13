export interface SelectOption {
    label: string;
    value: string | number;
  }
  
  export interface SelectInputProps {
    label: string;
    options: SelectOption[];
    value: string | number;
    onValueChange: (value: string | number) => void;
    placeholder?: string;
    className?: string;
  }