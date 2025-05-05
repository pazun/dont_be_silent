import React, { useState, useEffect } from 'react';
import { Layout, ConfigProvider } from 'antd';
import { createBrowserRouter, RouterProvider, Link, Outlet } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import { PhoneOutlined } from '@ant-design/icons';
import Logo from '/Logo.svg';
import styles from './styles/Header.module.css';
import Counter from './components/Counter';
import AppFooter from './components/Footer';
import About from './pages/About';
import Donation from './pages/Donation';
import DomesticAbuse from './pages/DomesticAbuse';
import Support from './pages/Support';
import WhatWeDo from './pages/WhatWeDo';
import Call from './pages/EmergencyHelp';
import SignIn from './pages/SignIn';
import EmergencyHelp from './pages/EmergencyHelp';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import User from './pages/User';
import Admin from './pages/Admin';
import DonationHistory from './pages/DonationHistory';
import { customTheme } from './theme/theme';
import ErrorPage from './pages/ErrorPage';

const { Content } = Layout;

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ConfigProvider theme={customTheme}>
      <Layout>
        <Header isMobile={isMobile} customTheme={customTheme} />
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
        <AppFooter />
      </Layout>
    </ConfigProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/donation",
        element: <ProtectedRoute><Donation /></ProtectedRoute>,
      },
      {
        path: "/donation-history",
        element: <DonationHistory />,
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
        path: "/emergency-help",
        element: <EmergencyHelp />
      },
      {
        path: "/call",
        element: <EmergencyHelp />
      },
      {        path: "/signin",
        element: <SignIn />
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/user",
        element: <ProtectedRoute><User /></ProtectedRoute>,
      },
      {
        path: "/admin",
        element: <ProtectedRoute><Admin /></ProtectedRoute>,
      }
    ],
  },
]);

const Root = () => {
  return <RouterProvider router={router} />;
};

export default Root;