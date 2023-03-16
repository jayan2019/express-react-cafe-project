import React from 'react';
import type { FormInstance } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography, Layout } from 'antd';

import axios from '../../config/axios';

const { Text } = Typography;

interface IFormData {
  email: string;
  password: string;
  first_name: string;
  last_name?: string;
}

const layoutStyle: React.CSSProperties = {
  height: '100%',
  display: 'flex',
  justifyContent: 'center'
};

const Singup = () => {
  const formRef = React.useRef<FormInstance>(null);
  const navigate = useNavigate();

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!'
    }
  };

  const onSubmit = async (formData: IFormData) => {
    try {
      await axios.post('/auth/create', { ...formData, cafe_id: null });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout style={layoutStyle}>
      <Text style={{ fontSize: 50, fontWeight: 'bold', textAlign: 'center' }}>S I G N U P</Text>
      <Text style={{ textAlign: 'center', marginBottom: 30 }}>FOR AMAZING CAFE EXPERIENCE</Text>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        ref={formRef}
        name="nest-messages"
        onFinish={onSubmit}
        validateMessages={validateMessages}>
        <Form.Item label="Email" name="email" rules={[{ type: 'email', required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="first_name" label="First Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="last_name" label="Last Name">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Button type="primary" htmlType="submit">
            Signup
          </Button>
          <Button type="link" style={{ marginLeft: 10 }} onClick={() => navigate(-1)}>
            Back to Login
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default Singup;
