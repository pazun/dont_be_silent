import React, { useState } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Login successful!');
        localStorage.setItem('token', data.token);
        const from = location.state?.from || '/';
        navigate(from);
      } else {
        message.error(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      message.error('Failed to connect to server. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading} tip="Signing in...">
      <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Sign In</h2>
        <Form
          name="signin"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
              Sign In
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <span style={{ marginRight: '8px' }}>Don't have an account?</span>
            <Button 
              type="link" 
              onClick={() => navigate('/signup')}
              style={{ padding: 0 }}
            >
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
    </Spin>
  );
};

export default SignIn;