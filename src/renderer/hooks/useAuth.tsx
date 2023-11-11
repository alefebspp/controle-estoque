import { useContext } from 'react';
import AuthContext, { IAuthContextProps } from '../contexts/auth';

const useAuthContext = (): IAuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default useAuthContext;
