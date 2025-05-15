import React from 'react';
import { Layout, Typography, Card, Row, Col, Button } from 'antd';
import { PhoneOutlined, MessageOutlined, SafetyOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const EmergencyHelp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate('/confidential-chat'); 
  };

  const handleLogoutAndLeave = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

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
            title={<><MessageOutlined /> {t('emergency.onlineChat.title')}</>}
            bordered={false}
          >
            <Button
              type="primary"
              size="large"
              block
              style={{ marginBottom: '16px' }}
              onClick={handleStartChat}
            >
              {t('emergency.onlineChat.startChat')}
            </Button>
            <Paragraph>
              {t('emergency.onlineChat.description')}
              <ul>
                <li>{t('emergency.onlineChat.point1')}</li>
                <li>{t('emergency.onlineChat.point2')}</li>
                <li>{t('emergency.onlineChat.point3')}</li>
                <li>{t('emergency.onlineChat.point4')}</li>
              </ul>
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            title={<><SafetyOutlined /> {t('emergency.safety.title')}</>}
            bordered={false}
          >
            <Paragraph>
              <Text strong>{t('emergency.safety.tips')}:</Text>
              <ul>
                <li>{t('emergency.safety.point1')}</li>
                <li>{t('emergency.safety.point2')}</li>
                <li>{t('emergency.safety.point3')}</li>
                <li>{t('emergency.safety.point4')}</li>
              </ul>
            </Paragraph>
            <Button danger block onClick={handleLogoutAndLeave}> {/* Add onClick handler */}
              {t('emergency.safety.leaveButton')}
            </Button>
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: '24px', background: '#FFF4F4' }}>
        <Title level={4}>{t('emergency.remember.title')}:</Title>
        <Paragraph>
          <ul>
            <li>{t('emergency.remember.point1')}</li>
            <li>{t('emergency.remember.point2')}</li>
            <li>{t('emergency.remember.point3')}</li>
            <li>{t('emergency.remember.point4')}</li>
          </ul>
        </Paragraph>
      </Card>
    </Content>
  );
};

export default EmergencyHelp;