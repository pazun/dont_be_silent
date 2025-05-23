import React, { useState, useEffect } from 'react';
import { Layout, ConfigProvider, theme } from 'antd';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import AppFooter from './components/Footer';
import About from './pages/About';
import Donation from './pages/Donation';
import DomesticAbuse from './pages/DomesticAbuse';
import Support from './pages/Support';
import WhatWeDo from './pages/WhatWeDo';
import EmergencyHelp from './pages/EmergencyHelp';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Payment from './pages/Payment';
import User from './pages/User';
import Admin from './pages/Admin';
import DonationHistory from './pages/DonationHistory';
import ConfidentialChat from './pages/ConfidentialChat'; // Import ConfidentialChat
import { customTheme, lightTheme, darkTheme } from './theme/theme';
import ErrorPage from './pages/ErrorPage';
import Notifications from './components/Notifications';

const { Content } = Layout;

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    const fetchUserTheme = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('http://localhost:3000/api/settings', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const settings = await response.json();
          if (settings.theme) {
            setCurrentTheme(settings.theme);
          } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setCurrentTheme('dark');
          }
        }
      } catch (error) {
        console.error('Error fetching theme settings:', error);
      }
    };

    fetchUserTheme();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const themeConfig = {
    ...customTheme,
    token: {
      ...customTheme.token,
      ...(currentTheme === 'light' ? lightTheme.token : darkTheme.token),
    },
    algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <Notifications />
      <Layout>
        <Header isMobile={isMobile} customTheme={themeConfig} />
        <Layout style={{ padding: '0 24px 24px', background: themeConfig.token.colorBgLayout }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: themeConfig.token.colorBgContainer,
              borderRadius: themeConfig.token.borderRadius,
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
      },
      {
        path: "/confidential-chat",
        element: <ProtectedRoute><ConfidentialChat /></ProtectedRoute>,
      },
      {
        path: "/payment",
        element: <Payment />,
      }
    ],
  },
]);

const Root = () => {
  return <RouterProvider router={router} />;
};

export default Root;