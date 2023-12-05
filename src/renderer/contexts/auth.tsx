import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

import { DefaultResponse } from '../types/services/response';
import { LoginRequest } from '../types/services/auth/requests';
import { Stablishment, User } from '../types/types';

import { db } from '../config/db/firebase';
import { errorDefaultResponse } from '../lib/helpers/responses';
import { getStablishment } from '../services/stablishment';
import { showErrorToast } from '../lib/show-toast';

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

  const authErrorResponse = (): DefaultResponse => ({
    success: false,
    message: 'Email ou senha incorretos',
  });

  const login = async ({
    email,
    password,
  }: LoginRequest): Promise<DefaultResponse> => {
    try {
      const docRef = doc(db, 'users', email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { password: docPassword, id, name } = docSnap.data();

        if (password !== docPassword) {
          return authErrorResponse();
        }

        setUser({ id, name });
        setIsLoggedIn(true);
        window.electron.store.set('user-email', email);
        navigate('/home');

        return {
          success: true,
          message: 'Bem-vindo',
        };
      } else {
        return authErrorResponse();
      }
    } catch (error) {
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
    const persistLogin = async (email: string) => {
      const docRef = doc(db, 'users', email);
      const docSnap = await getDoc(docRef);
      const userExists = docSnap.exists();
      if (userExists) {
        const password = docSnap.data().password;
        await login({ email, password });
      }
    };

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

    const userEmail = window.electron.store.get('user-email');
    const savedStablishment = window.electron.store.get('stablishment-id');
    if (userEmail) {
      persistLogin(userEmail);
    }
    if (savedStablishment) {
      getSavedStablishment(savedStablishment);
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
