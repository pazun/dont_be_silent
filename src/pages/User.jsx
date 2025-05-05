import React, { useState, useEffect } from 'react';
import { Layout, Typography, Card, Form, Input, Button, message, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;

const User = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Please sign in to view your profile');
        return;
      }

      const response = await fetch('http://localhost:3000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (response.ok) {
        setUserInfo(data);
      } else {
        message.error(data.error || 'Failed to fetch user information');
      }
    } catch (error) {
      message.error('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Please sign in to change your password');
        return;
      }

      const response = await fetch('http://localhost:3000/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Password changed successfully');
        form.resetFields();
      } else {
        message.error(data.error || 'Failed to change password');
      }
    } catch (error) {
      message.error('Failed to connect to server');
    }
  };

  return (
    <Content style={{ padding: '24px', minHeight: 280 }}>
      <Spin spinning={loading}>
        <Title level={2}>My Profile</Title>
        
        <Card title="Personal Information" style={{ marginBottom: '24px' }}>
          {userInfo && (
            <>
              <p><Text strong>Name:</Text> {userInfo.name}</p>
              <p><Text strong>Email:</Text> {userInfo.email}</p>
            </>
          )}
        </Card>

        <Card title="Change Password">
          <Form
            form={form}
            name="changePassword"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              name="currentPassword"
              label="Current Password"
              rules={[
                { required: true, message: 'Please input your current password!' }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />}
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                { required: true, message: 'Please input your new password!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />}
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm New Password"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Please confirm your new password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />}
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    </Content>
  );
};

export default User;