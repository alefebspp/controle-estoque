import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { showErrorToast, showSuccessToast } from '../lib/show-toast';

import {
  createProduct,
  deleteProduct,
  findProduct,
  getProducts,
  updateProduct,
} from '../services/products';

import { GetProductsParams } from '../types/services/products/requests';

const keys = {
  getProducts: ['products'],
};

export function useGetProducts(params: GetProductsParams) {
  return useQuery({
    queryFn: async () => await getProducts(params),
    queryKey: [...keys.getProducts],
  });
}

export function useFindProduct(productId: string) {
  return useQuery({
    queryFn: async () => {
      const response = await findProduct(productId);

      if (!response.success) {
        showErrorToast(response.message);
        return;
      }
      return response.product;
    },
    queryKey: [...keys.getProducts, productId],
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: ({ success, message }) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: keys.getProducts });
        showSuccessToast(message);
      } else {
        showErrorToast(message);
      }
    },
    onError: () => {
      showErrorToast('Erro no servidor');
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: ({ success, message }) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: keys.getProducts });
        showSuccessToast(message);
      } else {
        showErrorToast(message);
      }
    },
    onError: () => {
      showErrorToast('Erro no servidor');
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: ({ success, message }) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: keys.getProducts });
        showSuccessToast(message);
      } else {
        showErrorToast(message);
      }
    },
    onError: () => {
      showErrorToast('Erro no servidor');
    },
  });
}
