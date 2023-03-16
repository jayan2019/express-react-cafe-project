import React from 'react';
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
  const dispatch = useAppDispatch();

  const onSubmit = async (formData: IFormData) => {
    try {
      const { data } = await axios.post('/auth/login', formData);
      dispatch(addToken({ token: data.accessToken, user: data.user }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout style={layoutStyle}>
      <Text style={{ fontSize: 50, fontWeight: 'bold', textAlign: 'center' }}>L O G I N</Text>
      <Text style={{ textAlign: 'center', marginBottom: 30 }}>WITH YOUR CREDENTIALS</Text>
      <Form
        name="basic"
        autoComplete="off"
        onFinish={onSubmit}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}>
        <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 8 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Button htmlType="submit">Login</Button>
          <Button type="link" style={{ marginLeft: 10 }} onClick={() => navigate('signup')}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default Login;
