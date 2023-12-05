import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from '../Input/Input';
import Button from '../Button/Button';

import useAuthContext from '../../hooks/useAuth';
import { useCreateStablishment } from '../../hooks/useStablishments';

export const createStablishmentSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
});

const CreateStablishment = () => {
  const { user } = useAuthContext();
  const { mutateAsync, isPending } = useCreateStablishment();

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(createStablishmentSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    if (user) {
      const response = await mutateAsync({ userId: user.id, name: data.name });
      if (response.success) {
        reset();
      }
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex items-end gap-[1rem]">
      <Input
        className=" xl:min-w-[300px]"
        register={register}
        name="name"
        placeholder="Novo estabeleciomento"
        label=""
      />
      <Button isLoading={isPending} className="w-[80px] rounded-3xl">
        Criar
      </Button>
    </form>
  );
};

export default CreateStablishment;
