import { SelectProps } from './interface';
import { cn } from '../../lib/util';

import InputError from '../InputError/InputError';

const Select = ({
  label,
  options,
  placeholder,
  name,
  register,
  className,
  defaultValue,
  onChange,
  errors,
}: SelectProps) => {
  return (
    <div className={cn('flex flex-col w-[300px]', className)}>
      <label
        htmlFor={name}
        className="block text-xs font-medium text-graphite-400 dark:text-white"
      >
        {label}
      </label>
      <select
        id={name}
        defaultValue={defaultValue ?? ''}
        placeholder={placeholder}
        {...register?.(name)}
        className="border border-graphite-400 rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-[0.5rem] placeholder:text-gray-400 placeholder:text-xs text-xs xl:placeholder:text-sm xl:text-sm outline-none"
        onChange={onChange}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option, index) => {
          return (
            <option
              key={index}
              className="text-graphite-500"
              value={option.value}
            >
              {option.label}
            </option>
          );
        })}
      </select>
      {errors && <InputError errors={errors} name={name} />}
    </div>
  );
};

export default Select;
