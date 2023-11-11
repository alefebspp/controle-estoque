import AuthRoutes from './auth.routes';
import useAuthContext from '../hooks/useAuth';
import UserRoutes from './user.routes';

const AppRoutes = () => {
  const { isLoggedIn } = useAuthContext();

  return isLoggedIn ? <UserRoutes /> : <AuthRoutes />;
};

export default AppRoutes;
