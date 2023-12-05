import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createStablishment, getStablishments } from '../services/stablishment';

import { showErrorToast, showSuccessToast } from '../lib/show-toast';

const keys = {
  getStablishments: ['stablishments'],
};

export function useGetStablishments(user_id: string) {
  return useQuery({
    queryFn: async () => await getStablishments(user_id),
    queryKey: [...keys.getStablishments],
  });
}

export function useCreateStablishment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStablishment,
    onSuccess: ({ success, message }) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: keys.getStablishments });
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
