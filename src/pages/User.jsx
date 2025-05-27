import React, { useState, useEffect } from 'react';
import { Layout, Typography, Card, Form, Input, Button, message, Spin, Avatar, Upload, Row, Col, Switch, Select } from 'antd';
import { UserOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Content } = Layout;
const { Title, Text } = Typography;

const User = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [nameForm] = Form.useForm();
  const [settingsForm] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetchUserInfo();
    fetchUserSettings();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error(t('user.signInToViewProfile'));
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
        console.log('User profile image path:', data.profile_image);
      } else {
        message.error(data.error || t('user.failedToFetchUserInfo'));
      }
    } catch (error) {
      message.error(t('user.failedToConnectServer'));
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error(t('user.signInToChangePassword'));
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
        message.success(t('user.passwordChangedSuccessfully'));
        form.resetFields();
      } else {
        message.error(data.error || t('user.failedToChangePassword'));
      }
    } catch (error) {
      message.error(t('user.failedToConnectServer'));
    }
  };

  const onChangeName = async (values) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error(t('user.signInToChangeName'));
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
        message.success(t('user.nameChangedSuccessfully'));
        setUserInfo({ ...userInfo, name: values.newName });
        nameForm.resetFields();
      } else {
        message.error(data.error || t('user.failedToChangeName'));
      }
    } catch (error) {
      message.error(t('user.failedToConnectServer'));
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
        message.success(t('user.imageUploadedSuccessfully'));
        setImageUrl(data.filePath);
        
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
          message.success(t('user.profileImageUpdatedSuccessfully'));
        } else {
          message.error(t('user.failedToUpdateProfileImage'));
        }
        return true;
      } else {
        message.error(data.error || t('user.uploadFailed'));
        return false;
      }
    } catch (error) {
      console.error('Upload error:', error);
      message.error(t('user.failedToUploadImage'));
      return false;
    }
  };

  const fetchUserSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:3000/api/settings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (response.ok) {
        settingsForm.setFieldsValue(data);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  };

  const onUpdateSettings = async (values) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error(t('user.signInToUpdateSettings'));
        return;
      }

      const response = await fetch('http://localhost:3000/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(values)
      });

      const data = await response.json();

      if (response.ok) {
        message.success(t('user.settingsUpdatedSuccessfully'));
        if (values.language) {
          i18n.changeLanguage(values.language);
        }
      } else {
        message.error(data.error || t('user.failedToUpdateSettings'));
      }
    } catch (error) {
      message.error(t('user.failedToConnectServer'));
    }
  };

  return (
    <Content style={{ padding: '24px', minHeight: 280 }}>
      <Spin spinning={loading}>
        <Title level={2}>{t('user.myProfile')}</Title>
        
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card title={t('user.personalInformation')}>
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
                      <p><Text strong>{t('user.name')}:</Text> {userInfo.name}</p>
                      <p><Text strong>{t('user.email')}:</Text> {userInfo.email}</p>
                      <p><Text strong>{t('user.image')}:</Text> {userInfo.profile_image}</p>
                      <p><Text strong>{t('user.datereg')}:</Text> {"01.02.2025"}</p>
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
                          onError(new Error(t('user.uploadFailed')));
                        }
                      } catch (error) {
                        onError(error);
                      }
                    }}
                  >
                    <Button icon={<UploadOutlined />}>{t('user.changeProfileImage')}</Button>
                  </Upload>
                </>
              )}
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card title={t('user.accountSettings')}>
              <Form
                form={settingsForm}
                name="accountSettings"
                onFinish={onUpdateSettings}
                layout="vertical"
                initialValues={{
                  notifications: true,
                  theme: 'light',
                  language: 'en'
                }}
              >
                <Form.Item
                  name="notifications"
                  label={t('user.notifications')}
                >
                  <Switch 
                    checkedChildren={t('user.on')}
                    unCheckedChildren={t('user.off')}
                  />
                </Form.Item>

                <Form.Item
                  name="theme"
                  label={t('user.theme')}
                >
                  <Select>
                    <Select.Option value="light">{t('user.light')}</Select.Option>
                    <Select.Option value="dark">{t('user.dark')}</Select.Option>
                    <Select.Option value="system">{t('user.system')}</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="language"
                  label={t('user.language')}
                >
                  <Select>
                    <Select.Option value="en">{t('user.english')}</Select.Option>
                    <Select.Option value="kz">{t('user.qazaqsha')}</Select.Option>
                    <Select.Option value="ru">{t('user.russian')}</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" size="large" block>
                    {t('user.saveSettings')}
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card title={t('user.changeName')}>
              <Form
                form={nameForm}
                name="changeName"
                onFinish={onChangeName}
                layout="vertical"
                requiredMark={false}
              >
                <Form.Item
                  name="newName"
                  label={t('user.newName')}
                  rules={[
                    { required: true, message: t('user.newNameRequired') },
                    { min: 2, message: t('user.nameMinLength') }
                  ]}
                >
                  <Input 
                    prefix={<UserOutlined />}
                    size="large"
                    placeholder={t('user.enterNewName')}
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" size="large" block>
                    {t('user.changeNameButton')}
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card title={t('user.changePassword')}>
              <Form
                form={form}
                name="changePassword"
                onFinish={onFinish}
                layout="vertical"
                requiredMark={false}
              >
                <Form.Item
                  name="currentPassword"
                  label={t('user.currentPassword')}
                  rules={[
                    { required: true, message: t('user.currentPasswordRequired') }
                  ]}
                >
                  <Input.Password 
                    prefix={<LockOutlined />}
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="newPassword"
                  label={t('user.newPassword')}
                  rules={[
                    { required: true, message: t('user.newPasswordRequired') },
                    { min: 6, message: t('user.passwordMinLength') }
                  ]}
                >
                  <Input.Password 
                    prefix={<LockOutlined />}
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label={t('user.confirmNewPassword')}
                  dependencies={['newPassword']}
                  rules={[
                    { required: true, message: t('user.confirmNewPasswordRequired') },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error(t('user.passwordsDoNotMatch')));
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
                  <Button type="primary" htmlType="submit" size="large" block>
                    {t('user.changePasswordButton')}
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Spin>
    </Content>
  );
};

export default User;