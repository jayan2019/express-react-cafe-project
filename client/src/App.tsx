import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Form, Input, Select, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';

interface IUser {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  cafe_id: number;
}

interface ICafe {
  label: string;
  value: number;
}

const { Column } = Table;
const token = 'token';
const refreshToken = 'refreshToken';

function App() {
  const formRef = React.useRef<FormInstance>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [cafes, setCafes] = useState<ICafe[]>([]);

  const getUserData = async () => {
    const { data } = await axios.get('http://localhost:4000/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(data);
  };

  const getCafeData = async () => {
    const { data } = await axios.get('http://localhost:4000/cafes', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCafes(data.map((c: any) => ({ label: c.name, value: c.id })));
  };

  const onLogout = async () => {
    await axios.get('http://localhost:4000/auth/logout', {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  const onRefresh = async () => {
    await axios.post('http://localhost:4000/auth/refresh', { refresh_token: refreshToken });
  };

  useEffect(() => {
    getUserData();
    getCafeData();
  }, []);

  const onFinish = async (values: { user: IUser }) => {
    await axios.post('http://localhost:4000/auth/create', values.user);
  };

  const onCafeFinish = async (values: { cafe: IUser }) => {
    await axios.post('http://localhost:4000/cafes', values.cafe, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  const onLogin = async (values: { login: IUser }) => {
    await axios.post('http://localhost:4000/auth/login', values.login);
  };

  const handleSelectChange = (value: string) => {
    switch (value) {
      case 'male':
        formRef.current?.setFieldsValue({ note: 'Hi, man!' });
        break;
      case 'female':
        formRef.current?.setFieldsValue({ note: 'Hi, lady!' });
        break;
      case 'other':
        formRef.current?.setFieldsValue({ note: 'Hi there!' });
        break;
      default:
        break;
    }
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!'
    }
  };

  return (
    <div className="App">
      <Form
        {...layout}
        ref={formRef}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}>
        <Form.Item
          label="Email"
          name={['user', 'email']}
          rules={[{ type: 'email', required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'password']} label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name={['user', 'first_name']} label="First Name">
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'last_name']} label="Last Name">
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'cafe_id']} label="Last Name">
          <Select style={{ width: 120 }} onChange={handleSelectChange} options={cafes} />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Table dataSource={users}>
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="First Name" dataIndex="first_name" key="first_name" />
        <Column title="Last Name" dataIndex="last_name" key="last_name" />
        <Column title="Cafe Name" dataIndex="name" key="name" />
        <Column title="Cafe Address" dataIndex="address" key="address" />
      </Table>

      <Form
        {...layout}
        name="cafe-c"
        onFinish={onCafeFinish}
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}>
        <Form.Item name={['cafe', 'name']} label="Cafe Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['cafe', 'address']} label="Address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Form
        {...layout}
        name="cafe-c"
        onFinish={onLogin}
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}>
        <Form.Item
          label="Email"
          name={['login', 'email']}
          rules={[{ type: 'email', required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['login', 'password']} label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>

      <Button type="primary" htmlType="submit" onClick={onLogout}>
        Logout
      </Button>

      <Button type="primary" htmlType="submit" onClick={onRefresh}>
        Refresh
      </Button>
    </div>
  );
}

export default App;
