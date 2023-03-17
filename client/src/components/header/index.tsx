import React, { useState } from 'react';
import {
  UserOutlined,
  CoffeeOutlined,
  LogoutOutlined,
  FontColorsOutlined,
  FormatPainterOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { Layout, Typography, Switch, theme, Avatar, Dropdown, Space } from 'antd';

import { themeConfig } from '../../config/theme';
import { changeTheme, logout } from '../../app/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const { useToken } = theme;
const { Text } = Typography;
const { Header: BaseHeader } = Layout;

const headerStyle: React.CSSProperties = {
  height: 60,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

interface IHeader {
  isAutorised?: boolean;
}

const Header = ({ isAutorised }: IHeader) => {
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
    <BaseHeader style={headerStyle}>
      <Text style={{ color: token.colorWhite, fontSize: 30, fontWeight: 'bold' }}>
        <CoffeeOutlined /> My Cafe
      </Text>
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
