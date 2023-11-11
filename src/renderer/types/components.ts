import { VariantProps } from 'class-variance-authority';
import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react';
import { UseFormRegister } from 'react-hook-form';
import { buttonVariants } from '../components/Button/Button';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  register?: UseFormRegister<any>;
  errors?: Record<string, any>;
  icon?: ReactNode;
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren,
    VariantProps<typeof buttonVariants> {
  className?: string;
  isLoading?: boolean;
}

export interface InputErrorProps {
  errors: Record<string, any>;
  name: string;
}
