import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Counter from '../components/Counter';
import { Layout, Typography, Card, Row, Col, Button, Avatar } from 'antd';
import { HeartOutlined, UserOutlined } from '@ant-design/icons';
import LanguageSwitcher from '../components/LanguageSwitcher';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userImage, setUserImage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.name) {
          setIsLoggedIn(true);
          setUsername(data.name);
          setUserImage(data.profile_image ? `http://localhost:3000${data.profile_image}` : '');
        }
      })
      .catch(err => {
        console.error('Error fetching user info:', err);
      });
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };
  
  return (
    <Content style={{ padding: '24px', minHeight: 280 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <LanguageSwitcher />
      </div>
      <Typography>
        <Title level={1}>{t('home.welcome')}</Title>
        <Paragraph style={{ fontSize: '18px' }}>
          {t('home.description')}
        </Paragraph>
      </Typography>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} md={16}>
          <Card
            title={<><HeartOutlined /> {t('home.supportMission')}</>}
            bordered={false}
          >
            <Counter />
            <Paragraph style={{ marginTop: '16px', textAlign: 'center' }}>
              {t('home.thankYou')}
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false}>
            {isLoggedIn ? (
              <>
                <Button 
                  type="primary" 
                  block 
                  size="large" 
                  style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onClick={() => navigate('/user')}
                >
                  <Avatar 
                    size="small" 
                    src={userImage} 
                    icon={<UserOutlined />}
                    style={{ marginRight: '8px' }}
                  />
                  {username}
                </Button>
                <Button 
                  block 
                  size="large" 
                  onClick={handleSignOut}
                >
                  {t('home.signOut')}
                </Button>
              </>
            ) : (
              <>
                <Button 
                  type="primary" 
                  block 
                  size="large" 
                  style={{ marginBottom: '16px' }}
                  onClick={() => navigate('/signin')}
                >
                  {t('home.signIn')}
                </Button>
                <Button 
                  block 
                  size="large" 
                  onClick={() => navigate('/signup')}
                >
                  {t('home.signUp')}
                </Button>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default HomePage;