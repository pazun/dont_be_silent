import React from 'react';
import { Layout, Typography, Row, Col, Input, Button } from 'antd';
import { LinkedinOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Footer } = Layout;
const { Title, Text } = Typography;

const AppFooter = () => {
  const { t } = useTranslation();

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
            <Title level={5}>{t('footer.company')}</Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/about" style={{ color: '#151515' }}>{t('footer.aboutUs')}</Link>
              <Link to="/support" style={{ color: '#151515' }}>{t('footer.supportUs')}</Link>
              <Link to="/what-we-do" style={{ color: '#151515' }}>{t('footer.whatWeDo')}</Link>
              <Link to="/SignIn" style={{ color: '#151515' }}>{t('footer.signIn')}</Link>
              <Link to="/SignUp" style={{ color: '#151515' }}>{t('footer.signUp')}</Link>
            </div>
          </Col>

          <Col xs={24} sm={6}>
            <Title level={5}>{t('footer.quickLinks')}</Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/emergency-help" style={{ color: '#151515' }}>{t('footer.emergencyHelp')}</Link>
              <Link to="/about-abuse" style={{ color: '#151515' }}>{t('footer.aboutAbuse')}</Link>
              <Link to="/donation" style={{ color: '#151515' }}>{t('footer.makeDonation')}</Link>
              <Link to="/donation-history" style={{ color: '#151515' }}>{t('footer.donationHistory')}</Link>
              <Link to="/admin" style={{ color: '#151515' }}>{t('footer.admin')}</Link>
            </div>
          </Col>

          <Col xs={24} sm={6}>
            <Title level={5}>{t('footer.helpline')}</Title>
            <Text strong style={{ fontSize: '18px', color: '#DA2864' }}>8 707 520 05 19</Text>
            <Text style={{ display: 'block', marginTop: '10px' }}>{t('footer.helplineDescription')}</Text>
          </Col>
        </Row>

        <Row justify="space-between" align="middle" style={{ marginTop: '40px', borderTop: '1px solid #e8e8e8', paddingTop: '20px' }}>
          <Col>
            <Text>{t('footer.copyright')}</Text>
          </Col>
          <Col>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <LinkedinOutlined style={{ fontSize: '20px', color: '#DA2864' }} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FacebookOutlined style={{ fontSize: '20px', color: '#DA2864' }} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterOutlined style={{ fontSize: '20px', color: '#DA2864' }} />
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default AppFooter;