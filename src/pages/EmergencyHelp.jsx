import React from 'react';
import { Layout, Typography, Card, Row, Col, Button } from 'antd';
import { PhoneOutlined, MessageOutlined, SafetyOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const EmergencyHelp = () => {
  const { t } = useTranslation();
  
  return (
    <Content style={{ padding: '24px', minHeight: 280 }}>
      <Typography>
        <Title level={2}>{t('emergency.title')}</Title>
        <Paragraph>
          {t('emergency.callNow')} <Text strong>999</Text> {t('emergency.immediately')}
          {t('emergency.priority')}
        </Paragraph>
      </Typography>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} md={8}>
          <Card
            title={<><PhoneOutlined /> {t('emergency.helpline')}</>}
            bordered={false}
          >
            <Title level={3} style={{ color: '#DA2864' }}>8 707 520 05 19</Title>
            <Paragraph>
              {t('emergency.supportWorkers')}:
              <ul>
                <li>{t('emergency.listen')}</li>
                <li>{t('emergency.emotionalSupport')}</li>
                <li>{t('emergency.options')}</li>
                <li>{t('emergency.connect')}</li>
              </ul>
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            title={<><MessageOutlined /> Online Chat</>
            }
            bordered={false}
          >
            <Button type="primary" size="large" block style={{ marginBottom: '16px' }}>
              Start Confidential Chat
            </Button>
            <Paragraph>
              Chat with our support team online if you:
              <ul>
                <li>Can't speak safely on the phone</li>
                <li>Prefer typing to talking</li>
                <li>Need immediate support</li>
                <li>Want to explore your options</li>
              </ul>
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            title={<><SafetyOutlined /> Quick Exit</>
            }
            bordered={false}
          >
            <Paragraph>
              <Text strong>Safety Tips:</Text>
              <ul>
                <li>Press ESC key twice to quickly leave this site</li>
                <li>Clear your browser history after visiting</li>
                <li>Use private/incognito browsing</li>
                <li>Save emergency numbers under different names</li>
              </ul>
            </Paragraph>
            <Button danger block>
              Leave Site Quickly
            </Button>
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: '24px', background: '#FFF4F4' }}>
        <Title level={4}>Remember:</Title>
        <Paragraph>
          <ul>
            <li>You are not alone</li>
            <li>The abuse is not your fault</li>
            <li>Help is available</li>
            <li>Your life matters</li>
          </ul>
        </Paragraph>
      </Card>
    </Content>
  );
};

export default EmergencyHelp;