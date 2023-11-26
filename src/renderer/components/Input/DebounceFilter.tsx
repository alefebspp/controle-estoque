import { useState, useEffect } from 'react';
import Input from './Input';
import { DebounceInputProps } from './interface';

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  children,
  ...props
}: DebounceInputProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      label=""
      {...props}
      name="debounce_input"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {children}
    </Input>
  );
}

export default DebouncedInput;
