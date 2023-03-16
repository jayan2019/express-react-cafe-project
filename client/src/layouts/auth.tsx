import React from 'react';
import { CoffeeOutlined } from '@ant-design/icons';
import { Outlet, Navigate } from 'react-router-dom';
import { Layout, Typography, Switch, theme } from 'antd';

import { APP_VERSION } from '../config/env';
import { themeConfig } from '../config/theme';
import { changeTheme } from '../app/authSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';

const { useToken } = theme;
const { Text } = Typography;
const { Header, Content, Footer } = Layout;

const layoutStyle: React.CSSProperties = {
  height: '100vh'
};

const headerStyle: React.CSSProperties = {
  height: 60,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const footerStyle: React.CSSProperties = {
  height: 30,
  padding: 0,
  display: 'flex',
  borderTop: 'solid',
  borderTopWidth: 0.5,
  alignItems: 'center',
  justifyContent: 'center'
};

const AuthLayout = () => {
  const { token } = useToken();
  const dispatch = useAppDispatch();
  const isAutorised = useAppSelector((store) => store.auth.token && store.auth.user);

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Text style={{ color: token.colorWhite, fontSize: 30, fontWeight: 'bold' }}>
          <CoffeeOutlined /> My Cafe
        </Text>
        <Switch
          checkedChildren="Light"
          unCheckedChildren="Dark"
          onChange={(v) => dispatch(changeTheme(v ? themeConfig.LIGHT : themeConfig.DARK))}
        />
      </Header>
      <Content>{isAutorised ? <Navigate to="/" replace /> : <Outlet />}</Content>
      <Footer style={footerStyle}>
        <Text style={{ fontSize: 12, color: token.colorTextLabel }}>
          <CoffeeOutlined /> {`My Cafe - V${APP_VERSION} - All rights reserved`}
        </Text>
      </Footer>
    </Layout>
  );
};

export default AuthLayout;
