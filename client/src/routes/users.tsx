import { useRoutes } from 'react-router-dom';
import User from '../pages/user';

const UserRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <User />
    }
  ]);

  return routes;
};

export default UserRoutes;
