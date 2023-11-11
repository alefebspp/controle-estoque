import { DefaultResponse } from '../types/services/response';

export const errorDefaultResponse = (): DefaultResponse => ({
  success: false,
  message: 'Erro no servidor',
});
