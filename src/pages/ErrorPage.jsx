import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Result, Button, ConfigProvider } from 'antd';
import Header from '../components/Header';
import AppFooter from '../components/Footer';
import { customTheme } from '../theme/theme';

const { Content } = Layout;

const ErrorPage = () => {
  const isMobile = window.innerWidth <= 900;

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
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={
                <Button type="primary">
                  <Link to="/">Back Home</Link>
                </Button>
              }
            />
          </Content>
        </Layout>
        <AppFooter />
      </Layout>
    </ConfigProvider>
  );
};

export default ErrorPage;