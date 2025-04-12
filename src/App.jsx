import React, { useState, useEffect } from 'react';
import { Layout, Menu, theme, ConfigProvider, Button, Typography } from 'antd';
import { createBrowserRouter, RouterProvider, Link, Outlet, useNavigate } from 'react-router-dom';
import { PhoneOutlined } from '@ant-design/icons';
import Logo from '/Logo.svg';
import styles from './styles/Header.module.css';
import Counter from './components/Counter';
import About from './components/About';
import Donation from './components/Donation';
import DomesticAbuse from './components/DomesticAbuse';
import Support from './components/Support';
import WhatWeDo from './components/WhatWeDo';
import Call from './components/EmergencyHelp';
import EmergencyHelp from './components/EmergencyHelp';
const { Header, Content } = Layout;

const items1 = [
  {
    key: '/',
    label: 'I need help now',
  },
  {
    key: '/about-abuse',
    label: 'About domestic abuse',
  },
  {
    key: '/support',
    label: 'I want to support'
  },
  {
    key: '/what-we-do',
    label: 'What we do'
  }
];

const customTheme = {
  token: {
    colorPrimary: '#DA2864',
    colorBgContainer: '#F2F3EE',
    colorBgLayout: '#F2F3EE',
    colorText: '#151515',
    colorTextSecondary: '#DA2864',
    borderRadius: 24,
    colorBgHeader: '#F2F3EE',
    colorDonate: '#FFC0CB',
  },
};

const App = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  return (
    <ConfigProvider theme={customTheme}>
      <Layout>
        <Header style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center', background: customTheme.token.colorBgHeader, height: 'auto', padding: '12px 24px', gap: '16px' }}>
          <div className={styles['header-logo-container']} style={{ flex: '0 0 auto' }}>
            <img 
            onClick={() => navigate('/')}
            src={Logo} alt="Logo" className={styles['main-logo']} />
            <img 
            onClick={() => navigate('/')}
            src="/Text.svg" alt="Text Logo" className={styles['text-logo']} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: '1', width: '100%' }}>
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginBottom: isMobile ? '12px' : '0',
              gap: '16px'
            }}>
              <Typography.Text style={{
                color: '#DA2864',
                marginRight: isMobile ? '0' : '16px',
                textAlign: isMobile ? 'center' : 'left'
              }}>Need help now? Contact us free, 24/7 on</Typography.Text>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: isMobile ? '0' : '16px',
                justifyContent: isMobile ? 'center' : 'flex-start'
              }}>
                <PhoneOutlined style={{ fontSize: '24px', color: '#DA2864', marginRight: '8px' }} />
                <Typography.Text strong style={{ color: '#DA2864', fontSize: '20px' }}>8(808)040444</Typography.Text>
              </div>
              <div style={{
                display: 'flex',
                gap: '16px',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'stretch',
                width: isMobile ? '100%' : 'auto',
                marginTop: isMobile ? '12px' : '0',
                maxWidth: isMobile ? '100%' : '400px',
                minWidth: isMobile ? 'auto' : '300px'
              }}>
                <Button 
                  type="primary" 
                  shape="round" 
                  onClick={() => navigate('/Call')}
                  icon={<PhoneOutlined />} 
                  size="large" 
                  style={{
                  height: '48px',
                  padding: '0 32px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  Call Helpline
                </Button>
                <Button 
                  shape="round" 
                  size="large" 
                  onClick={() => navigate('/donation')}
                  style={{
                    background: customTheme.token.colorDonate,
                    border: 'none',
                    height: '48px',
                    padding: '0 32px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  Donate
                </Button>
              </div>
            </div>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              items={items1}
              style={{ background: 'transparent', justifyContent: 'flex-end', border: 'none', fontSize: '16px' }}
              onClick={handleMenuClick}
            />
          </div>
        </Header>
        <Layout style={{ padding: '0 24px 24px', background: customTheme.token.colorBgLayout }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: customTheme.token.colorBgContainer,
              borderRadius: customTheme.token.borderRadius,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
const HomePage = () => (
  <div>
    <h1>Welcome to Don't Be Silent</h1>
    <p>This project helps people to avoid abuse</p>
    <div className="card">
      <Counter />
      <p>Thank you for joining our community</p>
    </div>
    <p className="read-the-docs">
      Click on our logos to learn more
    </p>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404! Error, go back to site <Link to="/">Home</Link></div>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/donation",
        element: <Donation />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/about-abuse",
        element: <DomesticAbuse />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/what-we-do",
        element: <WhatWeDo />,
      },
      {
        path: "/EmergencyHelp",
        element: <EmergencyHelp></EmergencyHelp>
      },
      {
        path: "/Call",
        element: <div>Call us now 8(808)040444</div>,
      }
    ],
  },
]);

const Root = () => {
  return <RouterProvider router={router} />;
};

export default Root;