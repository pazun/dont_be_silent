import React from 'react';
import { Layout, Typography, Card, Collapse, Row, Col } from 'antd';
import { WarningOutlined, HeartOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const DomesticAbuse = () => {
  const { t } = useTranslation();
  
  return (
    <Content style={{ padding: '24px', minHeight: 280 }}>
      <Typography>
        <Title level={2}>{t('domesticAbuse.title')}</Title>
        <Paragraph>
          {t('domesticAbuse.description')}
        </Paragraph>
      </Typography>

      <Row gutter={[16, 16]} style={{ marginTop: '24px', marginBottom: '24px' }}>
        <Col xs={24} md={8}>
          <img
            src="/images/Illustration1.jpeg"
            alt="Symbolic representation of healing - broken objects being gently pieced back together in soft, muted colors, conveying hope and healing"
            style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
          />
        </Col>
        <Col xs={24} md={8}>
          <img
            src="/images/Illustration2.jpeg"
            alt="Two hands gently touching with a subtle glow, symbolizing support and connection in overcoming adversity"
            style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
          />
        </Col>
        <Col xs={24} md={8}>
          <img
            src="/images/Illustration3.jpeg"
            alt="A resilient flower pushing through cracked earth in sunlight, symbolizing strength, growth, and hope for survivors"
            style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card
            title={<><WarningOutlined /> {t('domesticAbuse.typesTitle')}</>}
            bordered={false}
          >
            <Collapse defaultActiveKey={['1']}>
              <Panel header={t('domesticAbuse.physical.title')} key="1">
                <Paragraph>
                  {t('domesticAbuse.physical.description')}
                  <ul>
                    <li>{t('domesticAbuse.physical.point1')}</li>
                    <li>{t('domesticAbuse.physical.point2')}</li>
                    <li>{t('domesticAbuse.physical.point3')}</li>
                    <li>{t('domesticAbuse.physical.point4')}</li>
                  </ul>
                </Paragraph>
              </Panel>
              <Panel header={t('domesticAbuse.emotional.title')} key="2">
                <Paragraph>
                  {t('domesticAbuse.emotional.description')}
                  <ul>
                    <li>{t('domesticAbuse.emotional.point1')}</li>
                    <li>{t('domesticAbuse.emotional.point2')}</li>
                    <li>{t('domesticAbuse.emotional.point3')}</li>
                    <li>{t('domesticAbuse.emotional.point4')}</li>
                  </ul>
                </Paragraph>
              </Panel>
              <Panel header={t('domesticAbuse.financial.title')} key="3">
                <Paragraph>
                  {t('domesticAbuse.financial.description')}
                  <ul>
                    <li>{t('domesticAbuse.financial.point1')}</li>
                    <li>{t('domesticAbuse.financial.point2')}</li>
                    <li>{t('domesticAbuse.financial.point3')}</li>
                    <li>{t('domesticAbuse.financial.point4')}</li>
                  </ul>
                </Paragraph>
              </Panel>
            </Collapse>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title={<><HeartOutlined /> {t('domesticAbuse.warningTitle')}</>}
            bordered={false}
          >
            <Paragraph>
              {t('domesticAbuse.warningDescription')}
            </Paragraph>
            <ul>
              {Array.from({ length: 8 }, (_, i) => (
                <li key={i}>{t(`domesticAbuse.warningSigns.point${i + 1}`)}</li>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>

      <Card
        title={<><InfoCircleOutlined /> {t('domesticAbuse.impactTitle')}</>}
        style={{ marginTop: '24px' }}
        bordered={false}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Title level={4}>{t('domesticAbuse.physicalImpact.title')}</Title>
            <ul>
              {Array.from({ length: 4 }, (_, i) => (
                <li key={i}>{t(`domesticAbuse.physicalImpact.point${i + 1}`)}</li>
              ))}
            </ul>
          </Col>
          <Col xs={24} md={8}>
            <Title level={4}>{t('domesticAbuse.emotionalImpact.title')}</Title>
            <ul>
              {Array.from({ length: 4 }, (_, i) => (
                <li key={i}>{t(`domesticAbuse.emotionalImpact.point${i + 1}`)}</li>
              ))}
            </ul>
          </Col>
          <Col xs={24} md={8}>
            <Title level={4}>{t('domesticAbuse.socialImpact.title')}</Title>
            <ul>
              {Array.from({ length: 4 }, (_, i) => (
                <li key={i}>{t(`domesticAbuse.socialImpact.point${i + 1}`)}</li>
              ))}
            </ul>
          </Col>
        </Row>
      </Card>

      <Card style={{ marginTop: '24px', background: '#FFF4F4' }}>
        <Text strong>{t('domesticAbuse.reminder')}</Text>
        <Paragraph style={{ marginTop: '8px' }}>
          {t('domesticAbuse.helpMessage')}
        </Paragraph>
      </Card>
    </Content>
  );
};

export default DomesticAbuse;