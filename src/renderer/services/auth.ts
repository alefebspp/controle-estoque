import { db } from '../config/db/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { LoginRequest } from '../types/services/auth/requests';
import { DefaultResponse } from '../types/services/response';
import { errorDefaultResponse } from '../lib/helpers/responses';

const authErrorResponse = (): DefaultResponse => ({
  success: false,
  message: 'Email ou senha incorretos',
});

export const login = async ({
  email,
  password,
}: LoginRequest): Promise<DefaultResponse> => {
  try {
    const docRef = doc(db, 'users', email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { password: docPassword, id } = docSnap.data();
      if (password !== docPassword) {
        return authErrorResponse();
      }
      return {
        success: true,
        message: 'Bem-vindo',
        data: {
          id,
        },
      };
    } else {
      return authErrorResponse();
    }
  } catch (error) {
    return errorDefaultResponse();
  }
};
