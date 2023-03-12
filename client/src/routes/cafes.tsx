import { useRoutes } from 'react-router-dom';
import Cafe from '../pages/cafe';

const CafeRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Cafe />
    }
  ]);

  return routes;
};

export default CafeRoutes;
