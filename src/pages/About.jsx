import React from 'react';
import { Layout, Typography } from 'antd';
import { LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Menu, theme } from 'antd';

const { Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

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

const About = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider width={150} style={{ background: colorBgContainer }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 1 }}
          items={items2}
        />
      </Sider>
      <Content style={{ paddingLeft: 24 }}>
        <Typography>
          <Title level={2}>About Don't Be Silent</Title>
          <Paragraph>
            Don't Be Silent is a platform dedicated to supporting individuals affected by abuse
            and creating a safer community for everyone. Our mission is to provide resources,
            support, and a voice to those who need it most.
          </Paragraph>
          <Paragraph>
            We believe that by breaking the silence around abuse, we can create positive
            change and help prevent future incidents. Our platform offers various resources
            and support mechanisms to help individuals find the assistance they need.
          </Paragraph>
          <Title level={3}>Our Goals</Title>
          <Paragraph>
            <ul>
              <li>Provide a safe space for survivors to share their stories</li>
              <li>Connect individuals with professional support services</li>
              <li>Raise awareness about different forms of abuse</li>
              <li>Build a supportive community for healing and growth</li>
            </ul>
          </Paragraph>
        </Typography>
      </Content>
    </Layout>
  );
};

export default About;