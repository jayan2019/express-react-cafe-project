import { useRoutes } from 'react-router-dom';
import Login from '../pages/login';
import Singup from '../pages/signup';

const AuthRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Singup />
    }
  ]);

  return routes;
};

export default AuthRoutes;
