import React from 'react';
import { Layout, Typography, Row, Col, Input, Button } from 'antd';
import { LinkedinOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer } = Layout;
const { Title, Text } = Typography;

const AppFooter = () => {
  return (
    <Footer style={{ background: '#f5f5f5', padding: '40px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={6}>
            <div className="footer-logo">
              <img src="/Logo.svg" alt="Company Logo" style={{ height: '40px' }} />
            </div>
          </Col>

          <Col xs={24} sm={6}>
            <Title level={5}>Company</Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/about">About Us</Link>
              <Link to="/support">Support Us</Link>
              <Link to="/what-we-do">What We Do</Link>
            </div>
          </Col>

          <Col xs={24} sm={6}>
            <Title level={5}>Quick Links</Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/emergency-help">Emergency Help</Link>
              <Link to="/about-abuse">About Domestic Abuse</Link>
              <Link to="/donation">Make a Donation</Link>
            </div>
          </Col>

          <Col xs={24} sm={6}>
            <Title level={5}>24/7 Helpline</Title>
            <Text strong style={{ fontSize: '18px', color: '#DA2864' }}>8(808)040444</Text>
            <Text style={{ display: 'block', marginTop: '10px' }}>Free, confidential support available 24/7</Text>
          </Col>
        </Row>

        <Row justify="space-between" align="middle" style={{ marginTop: '40px', borderTop: '1px solid #e8e8e8', paddingTop: '20px' }}>
          <Col>
            <Text>Copyright © 2025 Don't Be Silent. All Rights Reserved</Text>
          </Col>
          <Col>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <LinkedinOutlined style={{ fontSize: '20px' }} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FacebookOutlined style={{ fontSize: '20px' }} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterOutlined style={{ fontSize: '20px' }} />
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default AppFooter;