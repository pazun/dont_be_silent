import React, { useState } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation(); // Get the translation function

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
        message.success(t('signIn.loginSuccess')); // Use translation key
        localStorage.setItem('token', data.token);
        const from = location.state?.from || '/';
        navigate(from);
      } else {
        message.error(data.error || t('signIn.loginFailed')); // Use translation key
      }
    } catch (error) {
      message.error(t('signIn.connectionFailed')); // Use translation key
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading} tip={t('signIn.signingIn')}> {/* Use translation key */}
      <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>{t('signIn.title')}</h2> {/* Use translation key */}
        <Form
          name="signin"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label={t('signIn.emailLabel')} // Use translation key
            rules={[
              { required: true, message: t('signIn.emailRequired') }, // Use translation key
              { type: 'email', message: t('signIn.emailInvalid') } // Use translation key
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label={t('signIn.passwordLabel')} // Use translation key
            rules={[
              { required: true, message: t('signIn.passwordRequired') }, // Use translation key
              { min: 6, message: t('signIn.passwordMinLength') } // Use translation key
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
              {t('signIn.signInButton')} {/* Use translation key */}
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <span style={{ marginRight: '8px' }}>{t('signIn.noAccount')}</span> {/* Use translation key */}
            <Button
              type="link"
              onClick={() => navigate('/signup')}
              style={{ padding: 0 }}
            >
              {t('signIn.signUpLink')} {/* Use translation key */}
            </Button>
          </div>
        </Form>
      </div>
    </Spin>
  );
};

export default SignIn;