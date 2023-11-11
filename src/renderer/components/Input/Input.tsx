import { cn } from '../../lib/util';
import { InputProps } from '../../types/components';
import InputError from '../InputError/InputError';

const Input = ({
  name,
  type,
  placeholder,
  disabled = false,
  value,
  register,
  errors,
  icon,
  ...rest
}: InputProps) => {
  const placeholderDefault = 'Type here';

  const receivedError = errors ? errors[name] : false;

  console.log('ERRORS:', receivedError);
  return (
    <div className="flex flex-col items-center w-full">
      <div
        className={cn(
          'flex items-center border border-gray-400 gap-1 bg-white py-2 px-3 w-full h-9 rounded focus-within:border-0 focus-within:ring-2 ring-blue-500',
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
            'bg-transparent flex-1 placeholder:text-gray-400 text-gray-600 text-sm outline-none',
            {
              'placeholder:text-red-400': receivedError,
            },
          )}
        />
        {icon ? icon : null}
      </div>
      {errors && <InputError errors={errors} name={name} />}
    </div>
  );
};

export default Input;
