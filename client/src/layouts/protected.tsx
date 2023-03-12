import { Outlet, Navigate } from 'react-router-dom';

const ProtectedLayout = () => {
  const isAutorised = true;

  return (
    <div>
      <div>Main Layout</div>
      {isAutorised ? <Outlet /> : <Navigate to="/auth" />}
    </div>
  );
};

export default ProtectedLayout;
