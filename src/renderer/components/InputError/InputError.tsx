import { ErrorMessage } from '@hookform/error-message';
import { InputErrorProps } from './interface';

const InputError = ({ errors, name }: InputErrorProps) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      message={errors[name]?.message}
      render={({ message }) => (
        <p className="text-red-500 mr-auto text-xs font-semibold mt-[5px]">
          {message}
        </p>
      )}
    />
  );
};

export default InputError;
