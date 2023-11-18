import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { CURRENCYMask, applyCurrency } from '../../../lib/masks';
import { replaceCurrencyMask } from '../../../lib/filter';
import { updateProductSchema } from '../../../lib/schemas/products';

import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import Spinner from '../../../components/Loaders/Spinner';

import { useFindProduct, useUpdateProduct } from '../../../hooks/useProducts';

export const UpdateProduct = () => {
  const { productId } = useParams();

  const { data: product, isLoading } = useFindProduct(productId || '');
  const { mutateAsync } = useUpdateProduct();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(updateProductSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    if (product) {
      const { sell_value, ...rest } = data;

      await mutateAsync({
        productId: product.id,
        data: {
          ...rest,
          sell_value: replaceCurrencyMask(sell_value as string),
        },
      });
    }
  });

  useEffect(() => {
    if (product) {
      reset(product);

      const sellValue = applyCurrency(product.sell_value);

      setValue('sell_value', sellValue);
    }
  }, [product, reset]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-xl font-semibold text-graphite-400">
        Editar Produto
      </h2>
      <div className="w-full h-full flex justify-center items-center">
        <form
          onSubmit={onSubmit}
          className="w-fit flex flex-col justify-center items-center gap-[15px]"
        >
          <Input
            register={register}
            errors={errors}
            name="description"
            placeholder="Descrição"
          />
          <Input
            register={register}
            errors={errors}
            name="sell_value"
            placeholder="Valor de venda"
            onChange={(e) => {
              setValue('sell_value', CURRENCYMask(e.target.value));
            }}
          />
          <Input
            register={register}
            errors={errors}
            name="stock_quantity"
            placeholder="Qtd. estoque"
            type="number"
          />
          <Button
            className="w-full"
            variant="secondary"
            isLoading={isSubmitting}
            type="submit"
          >
            Atualizar produto
          </Button>
        </form>
      </div>
    </div>
  );
};
