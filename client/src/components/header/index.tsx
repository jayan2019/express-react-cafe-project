import React, { useState } from 'react';
import {
  UserOutlined,
  CoffeeOutlined,
  LogoutOutlined,
  FormatPainterOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Typography, Switch, theme, Avatar, Dropdown } from 'antd';

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

  const [isOpen, setOpen] = useState<boolean>(false);
  const { theme } = useAppSelector((store) => store.auth);

  const onAppearanceChange = (v: boolean) => {
    dispatch(changeTheme(v ? themeConfig.LIGHT : themeConfig.DARK));
  };

  <Switch
    checkedChildren="Light"
    unCheckedChildren="Dark"
    onChange={(v) => dispatch(changeTheme(v ? themeConfig.LIGHT : themeConfig.DARK))}
  />;

  const items: MenuProps['items'] = [
    { key: 1, icon: <LogoutOutlined />, label: 'Logout', onClick: () => dispatch(logout()) },
    {
      key: 2,
      icon: <FormatPainterOutlined />,
      label: (
        <div>
          <Text style={{ marginRight: 10 }}>Appearance</Text>
          <Appearance theme={theme} onChange={onAppearanceChange} />
        </div>
      )
    }
  ];

  return (
    <BaseHeader style={headerStyle}>
      <Text style={{ color: token.colorWhite, fontSize: 30, fontWeight: 'bold' }}>
        <CoffeeOutlined /> My Cafe
      </Text>
      {isAutorised ? (
        <Dropdown
          arrow
          open={isOpen}
          menu={{ items }}
          trigger={['click']}
          onOpenChange={(v) => setOpen(v)}>
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      ) : (
        <Appearance theme={theme} onChange={onAppearanceChange} />
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
