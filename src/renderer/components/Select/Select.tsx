import { SelectProps } from './interface';
import { cn } from '../../lib/util';

const Select = ({
  label,
  options,
  placeholder,
  name,
  register,
  className,
  defaultValue,
  onChange,
}: SelectProps) => {
  return (
    <div className={cn('flex flex-col min-w-[300px]', className)}>
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
        className="border border-graphite-400 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block h-10 w-full px-2 placeholder:text-gray-400 outline-none"
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
    </div>
  );
};

export default Select;
