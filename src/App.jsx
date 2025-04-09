import React from 'react';
import { Layout, Menu, theme, ConfigProvider } from 'antd';
import { createBrowserRouter, RouterProvider, Link, Outlet, useNavigate } from 'react-router-dom';
import Logo from '/Logo.svg';
import styles from './styles/Header.module.css';
import Counter from './components/Counter';
import About from './components/About';
import Donation from './components/Donation';
const { Header, Content } = Layout;

const items1 = [
  {
    key: '/',
    label: 'Home'
  },
  {
    key: '/donation',
    label: 'Donation'
  },
  {
    key: '/about',
    label: 'About'
  }
];

const customTheme = {
  token: {
    colorPrimary: '#DA2864',
    colorBgContainer: '#F2F3EE',
    colorBgLayout: '#F2F3EE',
    colorText: '#DA2864',
    colorTextSecondary: '#151515',
    borderRadius: 6,
    colorBgHeader: '#F2F3EE',
  },
};

const App = () => {
  const navigate = useNavigate();
  
  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  return (
    <ConfigProvider theme={customTheme}>
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center', background: customTheme.token.colorBgHeader }}>
          <div className={styles['header-logo-container']}>
            <img src={Logo} alt="Logo" className={styles['main-logo']} />
            <img src="/Text.svg" alt="Text Logo" className={styles['text-logo']} />
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={items1}
            style={{ flex: 1, minWidth: 0, background: 'transparent', justifyContent: 'flex-end' }}
            onClick={handleMenuClick}
          />
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
    ],
  },
]);

const Root = () => {
  return <RouterProvider router={router} />;
};

export default Root;