import { Layout } from 'antd';
import { Outlet, Navigate } from 'react-router-dom';

import Footer from '../components/footer';
import Header from '../components/header';
import { useAppSelector } from '../app/hooks';

const { Content } = Layout;

const layoutStyle: React.CSSProperties = {
  height: '100vh'
};

const ProtectedLayout = () => {
  const isAutorised = useAppSelector((store) => !!(store.auth.token && store.auth.user));

  return (
    <Layout style={layoutStyle}>
      <Header isAutorised={isAutorised} />
      <Content> {isAutorised ? <Outlet /> : <Navigate to="/auth" />}</Content>
      <Footer />
    </Layout>
  );
};

export default ProtectedLayout;
