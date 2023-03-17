import React from 'react';
import { Layout } from 'antd';
import { Outlet, Navigate } from 'react-router-dom';

import Footer from '../components/footer';
import Header from '../components/header';
import { useAppSelector } from '../app/hooks';

const { Content } = Layout;

const layoutStyle: React.CSSProperties = {
  height: '100vh'
};

const AuthLayout = () => {
  const isAutorised = useAppSelector((store) => store.auth.token && store.auth.user);

  return (
    <Layout style={layoutStyle}>
      <Header />
      <Content>{isAutorised ? <Navigate to="/" replace /> : <Outlet />}</Content>
      <Footer />
    </Layout>
  );
};

export default AuthLayout;
