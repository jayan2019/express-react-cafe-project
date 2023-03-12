import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout = () => {
  const isAutorised = true;

  return (
    <div>
      <div>Auth Layout</div>
      {isAutorised ? <Navigate to="/" replace /> : <Outlet />}
    </div>
  );
};

export default AuthLayout;
