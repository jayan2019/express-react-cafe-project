import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Typography, Layout } from 'antd';

import axios from '../../config/axios';
import { addToken } from '../../app/authSlice';
import { useAppDispatch } from '../../app/hooks';

const { Text } = Typography;

interface IFormData {
  email: string;
  password: string;
  remember: boolean;
}

const layoutStyle: React.CSSProperties = {
  height: '100%',
  display: 'flex',
  justifyContent: 'center'
};

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onSubmit = async (formData: IFormData) => {
    try {
      const { data } = await axios.post('/auth/login', formData);
      dispatch(addToken({ token: data.accessToken, user: data.user }));
    } catch (error) {
      console.log(error);
    }
  };

  const validateMessages = {
    required: '${label}' + ` ${t('validate_required')}`,
    types: {
      email: '${label}' + ` ${t('validate_email')}`
    }
  };

  return (
    <Layout style={layoutStyle}>
      <Text style={{ fontSize: 50, fontWeight: 'bold', textAlign: 'center' }}>
        {t('login_lable')}
      </Text>
      <Text style={{ textAlign: 'center', marginBottom: 30 }}>{t('login_greetings')}</Text>
      <Form
        name="basic"
        autoComplete="off"
        onFinish={onSubmit}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        validateMessages={validateMessages}>
        <Form.Item
          name="email"
          label={t('label_email')}
          rules={[{ type: 'email', required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label={t('label_password')} rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 8 }}>
          <Checkbox>{t('label_remenber')}</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Button htmlType="submit">{t('button_login')}</Button>
          <Button type="link" style={{ marginLeft: 10 }} onClick={() => navigate('signup')}>
            {t('button_signup')}
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default Login;
