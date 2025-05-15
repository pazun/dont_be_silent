import React, { useState } from 'react';
import { Form, Input, Button, message, Upload } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation(); // Get the translation function

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
        message.success(t('signUp.registrationSuccess')); // Use translation key
        localStorage.setItem('token', data.token);
        navigate('/signin');
      } else {
        message.error(data.error || t('signUp.registrationFailed')); // Use translation key
      }
    } catch (error) {
      console.error('Registration error:', error);
      message.error(t('signUp.connectionFailed')); // Use translation key
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
        message.success(t('signUp.uploadSuccess')); // Use translation key
        setImageUrl(data.filePath);
        return true;
      } else {
        message.error(data.error || t('signUp.uploadFailed')); // Use translation key
        return false;
      }
    } catch (error) {
      console.error('Upload error:', error);
      message.error(t('signUp.uploadConnectionFailed')); // Use translation key
      return false;
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>{t('signUp.title')}</h2> {/* Use translation key */}
      <Form
        name="signup"
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name="name"
          label={t('signUp.nameLabel')} // Use translation key
          rules={[{ required: true, message: t('signUp.nameRequired') }]} // Use translation key
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          name="email"
          label={t('signUp.emailLabel')} // Use translation key
          rules={[
            { required: true, message: t('signUp.emailRequired') }, // Use translation key
            { type: 'email', message: t('signUp.emailInvalid') } // Use translation key
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          label={t('signUp.passwordLabel')} // Use translation key
          rules={[
            { required: true, message: t('signUp.passwordRequired') }, // Use translation key
            { min: 6, message: t('signUp.passwordMinLength') } // Use translation key
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={t('signUp.confirmPasswordLabel')} // Use translation key
          dependencies={['password']}
          rules={[
            { required: true, message: t('signUp.confirmPasswordRequired') }, // Use translation key
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t('signUp.passwordsMatchError'))); // Use translation key
              },
            }),
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          name="profile_image"
          label={t('signUp.profileImageLabel')} // Use translation key
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
                  onError(new Error(t('signUp.uploadFailed'))); // Use translation key
                }
              } catch (error) {
                onError(error);
              }
            }}
          >
            <Button icon={<UploadOutlined />}>{t('signUp.uploadImageButton')}</Button> {/* Use translation key */}
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
            {t('signUp.signUpButton')} {/* Use translation key */}
          </Button>
        </Form.Item>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <span style={{ marginRight: '8px' }}>{t('signUp.haveAccount')}</span> {/* Use translation key */}
          <Button
            type="link"
            onClick={() => navigate('/signin')}
            style={{ padding: 0 }}
          >
            {t('signUp.signInLink')} {/* Use translation key */}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;