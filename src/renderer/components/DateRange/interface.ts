import { UseFormReturn } from 'react-hook-form';
import { SetURLSearchParams } from 'react-router-dom';

export interface DateRangeProps {
  form: UseFormReturn<any>;
  setDates: SetURLSearchParams;
}
