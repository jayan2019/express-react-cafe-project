import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Typography, theme } from 'antd';
import { CoffeeOutlined } from '@ant-design/icons';

import { APP_VERSION } from '../../config/env';

const { useToken } = theme;
const { Text } = Typography;
const { Footer: BaseFooter } = Layout;

const footerStyle: React.CSSProperties = {
  height: 30,
  padding: 0,
  display: 'flex',
  borderTop: 'solid',
  borderTopWidth: 0.5,
  alignItems: 'center',
  justifyContent: 'center'
};

const Footer = () => {
  const { token } = useToken();
  const { t } = useTranslation();

  return (
    <BaseFooter style={footerStyle}>
      <Text style={{ fontSize: 12, color: token.colorTextLabel }}>
        <CoffeeOutlined /> {`My Cafe - V${APP_VERSION} - ${t('footer_rights')}`}
      </Text>
    </BaseFooter>
  );
};

export default Footer;
