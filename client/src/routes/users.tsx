import { useRoutes } from 'react-router-dom';

const UserRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <div>User Page</div>
    }
  ]);

  return routes;
};

export default UserRoutes;
