import { ErrorMessage } from '@hookform/error-message';
import { InputErrorProps } from './interface';

const InputError = ({ errors, name }: InputErrorProps) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      message={errors[name]?.message}
      render={({ message }) => (
        <p className="text-red-400 mr-auto text-xs mt-[5px]">{message}</p>
      )}
    />
  );
};

export default InputError;
