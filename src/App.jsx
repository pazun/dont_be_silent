import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import Counter from './components/Counter';
const { Header, Content, Sider } = Layout;
//add different names to menu items
const items1 = [
  {
    key: '1',
    label: 'Home'
  },
  {
    key: '2',
    label: 'Donation'
  },
  {
    key: '3',
    label: 'About'
  }
];
const items2 = [
  {
    key: '1',
    icon: <NotificationOutlined />,
    label: 'nav 1',
  },
  {
    key: '2',
    icon: <LaptopOutlined />,
    label: 'nav 2',
  },
];

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
        />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
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
            <p>Helo world, this is project to help people to avoid abuse</p>
            Content
            <div className="card">
            <Counter></Counter>

        <p>
          Thanks you to joining out community
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Our logos to learn more
      </p>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404! Error, go back to site <Link to="/">Home</Link></div>,
  },
]);

const Root = () => {
  return <RouterProvider router={router} />;
};

export default Root;