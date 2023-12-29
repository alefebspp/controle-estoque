import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { DefaultResponse } from '../types/services/response';
import { LoginRequest } from '../types/services/auth/requests';
import { Stablishment, User } from '../types/types';

import { db } from '../config/db/firebase';
import {
  errorDefaultResponse,
  authErrorResponse,
} from '../lib/helpers/responses';
import { getStablishment } from '../services/stablishment';
import { showErrorToast } from '../lib/show-toast';
import { isAuthError } from '../errors/isAuthError';

export interface IAuthContextProps {
  user: User | undefined;
  isLoggedIn: boolean;
  login: (params: LoginRequest) => Promise<DefaultResponse>;
  logout: () => void;
  selectStablishment: (stablishment: Stablishment) => void;
  stablishment: Stablishment | undefined;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [stablishment, setStablishment] = useState<Stablishment>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  const auth = getAuth();

  const saveUserInfos = async (user: User, email: string) => {
    setUser(user);
    setIsLoggedIn(true);
    window.electron.store.set('user-email', email);
  };

  const getUserByEmail = async (email: string) => {
    try {
      const docRef = doc(db, 'users', email);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return {
          success: false,
          message: 'Usuário não existe',
          data: null,
        };
      }

      return {
        success: true,
        data: docSnap.data(),
        message: 'Sucesso',
      };
    } catch (error) {
      console.log(error);
      return errorDefaultResponse();
    }
  };

  const login = async ({
    email,
    password,
  }: LoginRequest): Promise<DefaultResponse> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      const response = await getUserByEmail(email);

      if (!response.success) {
        return {
          success: false,
          message: response.message,
        };
      }

      saveUserInfos(response.data, email);
      navigate('/home');

      return {
        success: true,
        message: 'Bem-vindo',
      };
    } catch (error) {
      console.log(error);
      if (isAuthError(error)) {
        const errorMessage = error.message;

        if (errorMessage.includes('invalid-login-credentials')) {
          return authErrorResponse({});
        }
        if (errorMessage.includes('auth/too-many-requests')) {
          return authErrorResponse({ tooManyTries: true });
        }
      }
      return errorDefaultResponse();
    }
  };

  const selectStablishment = (stablishment: Stablishment) => {
    setStablishment(stablishment);
    window.electron.store.set('stablishment-id', stablishment.id);
  };

  const logout = () => {
    setUser(undefined);
    setIsLoggedIn(false);
    window.electron.store.delete('user-email');
    navigate('/');
  };

  useEffect(() => {
    const userEmail = window.electron.store.get('user-email');
    const savedStablishment = window.electron.store.get('stablishment-id');

    const getSavedStablishment = async (id: string) => {
      try {
        const { stablishment, success, message } = await getStablishment(id);

        if (!success) {
          showErrorToast(message);
          return;
        }

        setStablishment(stablishment);
      } catch (error) {
        showErrorToast('Erro no servidor');
      }
    };

    const persistLogin = async (email: string) => {
      try {
        const response = await getUserByEmail(email);

        if (!response.success) {
          return showErrorToast(response.message);
        }

        const loginResponse = await login({
          email,
          password: response.data.password,
        });

        if (!loginResponse.success) {
          return showErrorToast(loginResponse.message);
        }

        if (savedStablishment) {
          await getSavedStablishment(savedStablishment);
        }
      } catch (error) {
        console.log(error);
        return errorDefaultResponse();
      }
    };

    if (userEmail) {
      persistLogin(userEmail);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoggedIn,
        stablishment,
        selectStablishment,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
