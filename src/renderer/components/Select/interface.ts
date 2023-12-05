import { ChangeEvent } from 'react';

import { UseFormRegister } from 'react-hook-form';
import { SelectOption } from '../../types/components';

export interface SelectProps {
  label: string;
  placeholder: string;
  options: SelectOption[];
  name: string;
  register?: UseFormRegister<any>;
  className?: string;
  defaultValue?: number | string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  errors?: Record<string, any>;
}
