import { useState } from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { UserOutlined, CoffeeOutlined, DashboardOutlined } from '@ant-design/icons';

import Footer from '../components/footer';
import Header from '../components/header';
import { useAppSelector } from '../app/hooks';

type MenuItem = Required<MenuProps>['items'][number];

const { Content } = Layout;
const items: MenuItem[] = [
  { label: 'Dashboard', key: '/', icon: <DashboardOutlined /> },
  { label: 'Users', key: '/users', icon: <UserOutlined /> },
  { label: 'Cafes', key: '/cafes', icon: <CoffeeOutlined /> }
];

const layoutStyle: React.CSSProperties = {
  height: '100vh'
};

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const isAutorised = useAppSelector((store) => !!(store.auth.token && store.auth.user));

  return (
    <Layout style={layoutStyle}>
      <Header
        collapsed={collapsed}
        isAutorised={isAutorised}
        toggleCollapsed={() => setCollapsed((v) => !v)}
      />
      <Layout style={{ display: 'flex', flexDirection: 'row' }}>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          inlineCollapsed={collapsed}
          selectedKeys={[`${pathname}`]}
          onSelect={(v) => navigate(v.key)}
          style={{ maxWidth: 200, height: '100%' }}
        />
        <Content> {isAutorised ? <Outlet /> : <Navigate to="/auth" />}</Content>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default ProtectedLayout;
