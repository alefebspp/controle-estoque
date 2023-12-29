import { DefaultResponse } from '../../types/services/response';

export const errorDefaultResponse = (): DefaultResponse => ({
  success: false,
  message: 'Erro no servidor',
});

export const authErrorResponse = ({
  tooManyTries,
}: {
  tooManyTries?: boolean;
}): DefaultResponse => ({
  success: false,
  message: tooManyTries
    ? 'Muitas tentativas erradas. Aguarde e tente depois.'
    : 'Email ou senha incorretos',
});
