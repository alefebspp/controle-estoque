import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';

import useAuthContext from '../../hooks/useAuth';
import { showErrorToast } from '../../lib/show-toast';

import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

export const loginSchema = yup.object().shape({
  email: yup.string().email('Digite um email').required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await login(data);
      if (!response.success) {
        showErrorToast(response.message);
      }
    } catch (error) {
      showErrorToast('Erro no servidor.Tente novamente');
    }
  });

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="w-[30%]">
        <form onSubmit={onSubmit} className="w-full h-full flex flex-col gap-4">
          <Input
            placeholder="Email"
            register={register}
            name="email"
            errors={errors}
          />
          <Input
            placeholder="Senha"
            register={register}
            name="password"
            errors={errors}
            type={showPassword ? 'text' : 'password'}
          >
            {showPassword ? (
              <EyeOpenIcon
                className="cursor-pointer mr-2"
                onClick={handleShowPassword}
              />
            ) : (
              <EyeClosedIcon
                className="cursor-pointer mr-2"
                onClick={handleShowPassword}
              />
            )}
          </Input>
          <Button variant="secondary" isLoading={isSubmitting} type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
