import AuthRoutes from './auth.routes';
import useAuthContext from '../hooks/useAuth';
import UserRoutes from './user.routes';
import AppLayout from '../styles/layout/AppLayout';

const AppRoutes = () => {
  const { isLoggedIn } = useAuthContext();

  return isLoggedIn ? (
    <AppLayout>
      <UserRoutes />
    </AppLayout>
  ) : (
    <AuthRoutes />
  );
};

export default AppRoutes;
