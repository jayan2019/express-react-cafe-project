import { createBrowserRouter } from 'react-router-dom';
import Auth from './auth';
import Cafes from './cafes';
import Users from './users';
import AuthLayout from '../layouts/auth';
import ProtectedLayout from '../layouts/protected';

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: '/auth/*', element: <Auth /> }]
  },
  {
    element: <ProtectedLayout />,
    children: [
      { path: '/', element: <div>Dashboard</div> },
      { path: '/users/*', element: <Users /> },
      { path: '/cafes/*', element: <Cafes /> }
    ]
  }
]);
