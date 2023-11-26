import { InputHTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { UseFormRegister } from 'react-hook-form';

export type DebounceInputProps = PropsWithChildren &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
  };

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string | number;
  register?: UseFormRegister<any>;
  errors?: Record<string, any>;
  className?: string;
  children?: ReactNode;
  label: string;
}
