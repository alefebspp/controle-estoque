import { Routes, Route } from 'react-router-dom';
import useAuthContext from '../hooks/useAuth';

const UserRoutes = () => {
  const { user, logout } = useAuthContext();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <h1>{`Olá, ${user?.name}`}</h1>
            <button onClick={logout}>Sair</button>
          </div>
        }
      />
    </Routes>
  );
};

export default UserRoutes;
