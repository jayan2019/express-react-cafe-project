import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

const ProtectedLayout = () => {
  const isAutorised = useAppSelector((store) => store.auth.token && store.auth.user);

  return (
    <div>
      <div>Main Layout</div>
      {isAutorised ? <Outlet /> : <Navigate to="/auth" />}
    </div>
  );
};

export default ProtectedLayout;
