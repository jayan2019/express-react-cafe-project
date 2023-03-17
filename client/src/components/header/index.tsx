import React from 'react';
import {
  UserOutlined,
  CoffeeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FontColorsOutlined,
  FormatPainterOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { Layout, Typography, Switch, theme, Avatar, Dropdown, Button, Space } from 'antd';

import { themeConfig } from '../../config/theme';
import { changeTheme, logout } from '../../app/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const { useToken } = theme;
const { Text } = Typography;
const { Header: BaseHeader } = Layout;

const headerStyle: React.CSSProperties = {
  height: 60,
  display: 'flex',
  paddingLeft: 10,
  alignItems: 'center',
  justifyContent: 'space-between'
};

const iconStyle: React.CSSProperties = {
  fontSize: 25,
  display: 'flex',
  textAlign: 'center'
};

const textStyle: React.CSSProperties = {
  fontSize: 30,
  display: 'flex',
  fontWeight: 'bold',
  textAlign: 'center'
};

interface IHeader {
  collapsed?: boolean;
  isAutorised?: boolean;
  toggleCollapsed?: () => void;
}

const Header = ({ isAutorised, collapsed, toggleCollapsed }: IHeader) => {
  const { token } = useToken();
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const { theme } = useAppSelector((store) => store.auth);

  const onAppearanceChange = (v: boolean) => {
    dispatch(changeTheme(v ? themeConfig.LIGHT : themeConfig.DARK));
  };

  const menuItems: MenuProps['items'] = [
    { key: 1, icon: <LogoutOutlined />, label: 'Logout', onClick: () => dispatch(logout()) },
    { type: 'divider' },
    {
      key: 2,
      icon: <FormatPainterOutlined />,
      label: (
        <div>
          <Text style={{ marginRight: 10 }}>Appearance</Text>
          <Appearance theme={theme} onChange={onAppearanceChange} />
        </div>
      )
    },
    { type: 'divider' },
    {
      key: 3,
      label: 'Language',
      children: [
        { key: 'en', label: 'English', onClick: () => i18n.changeLanguage('en') },
        { key: 'ta', label: 'Tamil', onClick: () => i18n.changeLanguage('ta') }
      ]
    }
  ];

  const languageItems: MenuProps['items'] = [
    { key: 'en', label: 'English', onClick: () => i18n.changeLanguage('en') },
    { key: 'ta', label: 'Tamil', onClick: () => i18n.changeLanguage('ta') }
  ];

  return (
    <BaseHeader style={{ ...headerStyle, paddingLeft: isAutorised ? 10 : 50 }}>
      <Space>
        {toggleCollapsed && (
          <Button
            type="text"
            onClick={toggleCollapsed}
            style={{ ...iconStyle, color: token.colorWhite }}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        )}
        <CoffeeOutlined style={{ ...iconStyle, color: token.colorWhite }} />
        <Text style={{ ...textStyle, color: token.colorWhite }}>My Cafe</Text>
      </Space>
      {isAutorised ? (
        <Dropdown arrow menu={{ items: menuItems, selectedKeys: [`${i18n.language}`] }}>
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      ) : (
        <Space>
          <Appearance theme={theme} onChange={onAppearanceChange} />
          <Dropdown arrow menu={{ items: languageItems, selectedKeys: [`${i18n.language}`] }}>
            <Avatar icon={<FontColorsOutlined />} />
          </Dropdown>
        </Space>
      )}
    </BaseHeader>
  );
};

export default Header;

interface IAppearance {
  theme: string;
  onChange: (v: boolean) => void;
}

const Appearance = ({ theme, onChange }: IAppearance) => {
  return (
    <Switch
      onChange={onChange}
      checkedChildren="Light"
      unCheckedChildren="Dark"
      checked={theme === themeConfig.LIGHT}
    />
  );
};
