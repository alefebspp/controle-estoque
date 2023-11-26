import { cn } from '../../lib/util';
import InputError from '../InputError/InputError';

import { InputProps } from './interface';

const Input = ({
  name,
  type,
  placeholder,
  disabled = false,
  value,
  register,
  errors,
  className,
  children,
  label,
  ...rest
}: InputProps) => {
  const placeholderDefault = '';

  return (
    <div className={cn('flex flex-col items-center min-w-[300px]', className)}>
      <label
        htmlFor={name}
        className="block mr-auto text-xs font-medium text-graphite-400 dark:text-white"
      >
        {label}
      </label>
      <div
        className={cn(
          'flex items-center border border-graphite-400 gap-1 bg-white w-full h-10 rounded focus-within:border-0 focus-within:ring-2 ring-blue-500',
        )}
      >
        <input
          {...register?.(name)}
          type={type ?? 'text'}
          multiple
          placeholder={placeholder ?? placeholderDefault}
          disabled={disabled}
          value={value}
          {...rest}
          className={cn(
            'bg-transparent flex-1 px-2 placeholder:text-gray-400 focus:placeholder:text-blue-500 text-graphite-500 text-sm outline-none',
          )}
        />
        {children}
      </div>
      {errors && <InputError errors={errors} name={name} />}
    </div>
  );
};

export default Input;
