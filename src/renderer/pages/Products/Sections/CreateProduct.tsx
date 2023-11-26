import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { CURRENCYMask } from '../../../lib/masks';
import { replaceCurrencyMask } from '../../../lib/filter';
import { createProductSchema } from '../../../lib/schemas/products';

import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

import useAuthContext from '../../../hooks/useAuth';
import { useCreateProduct } from '../../../hooks/useProducts';

export const CreateProduct = () => {
  const { user } = useAuthContext();

  const { mutateAsync } = useCreateProduct();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(createProductSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    if (user) {
      const { sell_value, ...rest } = data;

      const response = await mutateAsync({
        ...rest,
        sell_value: replaceCurrencyMask(sell_value),
        created_at: new Date(),
        userId: user.id,
      });

      if (response.success) {
        reset();
      }
    }
  });

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-xl font-semibold text-graphite-400">Novo Produto</h2>
      <div className="w-full h-full flex justify-center items-center">
        <form
          onSubmit={onSubmit}
          className="w-fit flex flex-col justify-center items-center gap-[15px]"
        >
          <Input
            register={register}
            errors={errors}
            name="description"
            placeholder="Digite uma descrição"
            label="Descrição"
          />
          <Input
            register={register}
            errors={errors}
            name="sell_value"
            placeholder="Digite um valor"
            onChange={(e) => {
              setValue('sell_value', CURRENCYMask(e.target.value));
            }}
            label="Valor de venda"
          />
          <Input
            register={register}
            errors={errors}
            name="stock_quantity"
            placeholder="Digite uma quantidade"
            type="number"
            label="Qtd. estoque"
          />
          <Button
            className="w-full"
            variant="secondary"
            isLoading={isSubmitting}
            type="submit"
          >
            Novo produto
          </Button>
        </form>
      </div>
    </div>
  );
};
