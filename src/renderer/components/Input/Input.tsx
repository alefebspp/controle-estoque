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
  ...rest
}: InputProps) => {
  const placeholderDefault = 'Type here';

  const receivedError = errors ? errors[name] : false;

  return (
    <div className={cn('flex flex-col items-center min-w-[300px]', className)}>
      <div
        className={cn(
          'flex items-center border border-graphite-400 gap-1 bg-white w-full h-9 rounded focus-within:border-0 focus-within:ring-2 ring-blue-500',
          {
            'ring-2 ring-red-500 border-0 text-red-400': receivedError,
          },
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
            'bg-transparent flex-1 px-2 placeholder:text-gray-400 focus:placeholder:text-blue-500 text-gray-600 text-sm outline-none',
            {
              'placeholder:text-red-400 focus:placeholder:text-red-400':
                receivedError,
            },
          )}
        />
        {children}
      </div>
      {errors && <InputError errors={errors} name={name} />}
    </div>
  );
};

export default Input;
