import React from 'react';
import { Layout, Typography, Card, Row, Col, Button } from 'antd';
import { HeartOutlined, TeamOutlined, SoundOutlined, DollarOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Support = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate('/donation');
  };
  const handleAbout = () => {
    navigate('/about');
  };

  return (
    <Content style={{ padding: '24px', minHeight: 280 }}>
      <Typography>
        <Title level={2}>{t('support.title')}</Title>
        <Paragraph>
          {t('support.description')}
        </Paragraph>
      </Typography>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} md={12} lg={6}>
          <Card
            title={<><DollarOutlined /> {t('support.donate.title')}</>}
            bordered={false}
            style={{ height: '100%' }}
          >
            <Paragraph>
              {t('support.donate.description')}
              <ul>
                {t('support.donate.benefits', { returnObjects: true }).map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </Paragraph>
            <Button type="primary" block onClick={handleDonateClick}>
              {t('support.donate.button')}
            </Button>
          </Card>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Card
            title={<><TeamOutlined /> {t('support.volunteer.title')}</>}
            bordered={false}
            style={{ height: '100%' }}
          >
            <Paragraph>
              {t('support.volunteer.description')}
              <ul>
                {t('support.volunteer.roles', { returnObjects: true }).map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
              </ul>
            </Paragraph>
            <Button type="primary" block onClick={handleAbout}>
              {t('support.volunteer.button')}
            </Button>
          </Card>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Card
            title={<><SoundOutlined /> {t('support.awareness.title')}</>}
            bordered={false}
            style={{ height: '100%' }}
          >
            <Paragraph>
              {t('support.awareness.description')}
              <ul>
                {t('support.awareness.ways', { returnObjects: true }).map((way, index) => (
                  <li key={index}>{way}</li>
                ))}
              </ul>
            </Paragraph>
            <Button type="primary" block onClick={handleAbout}>
              {t('support.awareness.button')}
            </Button>
          </Card>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Card
            title={<><HeartOutlined /> {t('support.corporate.title')}</>}
            bordered={false}
            style={{ height: '100%' }}
          >
            <Paragraph>
              {t('support.corporate.description')}
              <ul>
                {t('support.corporate.options', { returnObjects: true }).map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            </Paragraph>
            <Button type="primary" block onClick={handleAbout}>
              {t('support.corporate.button')}
            </Button>
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: '24px' }}>
        <Title level={3}>{t('support.impact.title')}</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card bordered={false}>
              <Title level={4}>{t('support.impact.helpline.title')}</Title>
              <Paragraph>
                {t('support.impact.helpline.description')}
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered={false}>
              <Title level={4}>{t('support.impact.services.title')}</Title>
              <Paragraph>
                {t('support.impact.services.description')}
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered={false}>
              <Title level={4}>{t('support.impact.prevention.title')}</Title>
              <Paragraph>
                {t('support.impact.prevention.description')}
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Card>
    </Content>
  );
};

export default Support;