import { useRoutes } from 'react-router-dom';
import Login from '../pages/login';

const AuthRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/signup',
      element: <div>Sign Up</div>
    }
  ]);

  return routes;
};

export default AuthRoutes;
