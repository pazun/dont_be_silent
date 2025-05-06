import React from 'react';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const SignUp = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await fetch('http://localhost:3001/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      message.success('Signup successful!');
      navigate('/signin');
    } catch (error) {
      message.error(error.message || 'Error during signup');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '0 16px' }}>
      <Card>
        <Title level={2} style={{ textAlign: 'center', color: '#DA2864' }}>
          Sign Up for Donations
        </Title>
        <Text type="secondary" style={{ textAlign: 'center', display: 'block', marginBottom: '24px' }}>
          Create an account to manage your donations and support our cause
        </Text>
        
        <Form
          form={form}
          name="signup"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="fullName"
            rules={[{ required: true, message: 'Please enter your full name' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Full Name"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 8, message: 'Password must be at least 8 characters' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large"
              block
              style={{ 
                backgroundColor: '#DA2864',
                height: '48px'
              }}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;