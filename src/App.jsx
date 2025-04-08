import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { createBrowserRouter, RouterProvider, Link, Outlet, useNavigate } from 'react-router-dom';
import Counter from './components/Counter';
import About from './components/About';
import Donation from './components/Donation';
const { Header, Content } = Layout;
//add different names to menu items
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
const App = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    navigate(e.key);
  };
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
          onClick={handleMenuClick}
        />
      </Header>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
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