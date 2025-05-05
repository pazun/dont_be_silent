import React, { useState, useEffect } from 'react';
import { Layout, Typography, Card, Form, Input, Button, message, Spin, Avatar, Upload } from 'antd';
import { UserOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;

const User = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [nameForm] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');

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
        console.log('User profile image path:', data.profile_image); // Add this line
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

  const onChangeName = async (values) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Please sign in to change your name');
        return;
      }

      const response = await fetch('http://localhost:3000/api/auth/change-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          newName: values.newName
        })
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Name changed successfully');
        setUserInfo({ ...userInfo, name: values.newName });
        nameForm.resetFields();
      } else {
        message.error(data.error || 'Failed to change name');
      }
    } catch (error) {
      message.error('Failed to connect to server');
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch('http://localhost:3000/api/upload/avatar', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        message.success('Image uploaded successfully');
        setImageUrl(data.filePath);
        
        // Update profile image in the backend
        const token = localStorage.getItem('token');
        const updateResponse = await fetch('http://localhost:3000/api/auth/update-profile-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            profile_image: data.filePath
          })
        });

        if (updateResponse.ok) {
          setUserInfo({ ...userInfo, profile_image: data.filePath });
          message.success('Profile image updated successfully');
        } else {
          message.error('Failed to update profile image');
        }
        return true;
      } else {
        message.error(data.error || 'Upload failed');
        return false;
      }
    } catch (error) {
      console.error('Upload error:', error);
      message.error('Failed to upload image');
      return false;
    }
  };

  return (
    <Content style={{ padding: '24px', minHeight: 280 }}>
      <Spin spinning={loading}>
        <Title level={2}>My Profile</Title>
        
        <Card title="Personal Information" style={{ marginBottom: '24px' }}>
          {userInfo && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <Avatar 
                  size={64} 
                  src={userInfo.profile_image ? `http://localhost:3000${userInfo.profile_image}` : null} 
                  icon={<UserOutlined />}
                  style={{ marginRight: '16px' }}
                />
                <div>
                  <p><Text strong>Name:</Text> {userInfo.name}</p>
                  <p><Text strong>Email:</Text> {userInfo.email}</p>
                </div>
              </div>
              <Upload
                accept="image/*"
                showUploadList={true}
                maxCount={1}
                customRequest={async ({ file, onSuccess, onError }) => {
                  try {
                    const success = await handleImageUpload(file);
                    if (success) {
                      onSuccess('ok');
                    } else {
                      onError(new Error('Upload failed'));
                    }
                  } catch (error) {
                    onError(error);
                  }
                }}
              >
                <Button icon={<UploadOutlined />}>Change Profile Image</Button>
              </Upload>
            </>
          )}
        </Card>

        <Card title="Change Name" style={{ marginBottom: '24px' }}>
          <Form
            form={nameForm}
            name="changeName"
            onFinish={onChangeName}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              name="newName"
              label="New Name"
              rules={[
                { required: true, message: 'Please input your new name!' },
                { min: 2, message: 'Name must be at least 2 characters!' }
              ]}
            >
              <Input 
                prefix={<UserOutlined />}
                size="large"
                placeholder="Enter your new name"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                Change Name
              </Button>
            </Form.Item>
          </Form>
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