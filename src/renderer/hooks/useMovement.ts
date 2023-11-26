import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createMovement, getMovements } from '../services/movement';
import { showErrorToast, showSuccessToast } from '../lib/show-toast';

const keys = {
  getMovements: ['movements'],
};

export function useGetMovements(user_id: string, from: string, to: string) {
  return useQuery({
    queryFn: async () => await getMovements({ user_id, from, to }),
    queryKey: [...keys.getMovements, from, to],
    enabled: !!from && !!to,
  });
}

export function useCreateMovement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMovement,
    onSuccess: ({ success, message }) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: keys.getMovements });
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
