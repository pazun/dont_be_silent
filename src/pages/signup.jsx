import React, { useState } from 'react';
import { Form, Input, Button, message, Upload } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Send as JSON instead of FormData
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          profile_image: imageUrl
        })
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Registration successful!');
        localStorage.setItem('token', data.token);
        navigate('/signin');
      } else {
        message.error(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      message.error('Failed to connect to server');
    } finally {
      setLoading(false);
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
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Sign Up</h2>
      <Form
        name="signup"
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input size="large" />
        </Form.Item>

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

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          name="profile_image"
          label="Profile Image"
        >
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
            <Button icon={<UploadOutlined />}>Upload Profile Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
          >
            Sign Up
          </Button>
        </Form.Item>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <span style={{ marginRight: '8px' }}>Already have an account?</span>
          <Button 
            type="link" 
            onClick={() => navigate('/signin')}
            style={{ padding: 0 }}
          >
            Sign In
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;