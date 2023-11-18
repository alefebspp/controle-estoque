import { VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { buttonVariants } from './Button';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren,
    VariantProps<typeof buttonVariants> {
  className?: string;
  isLoading?: boolean;
}
