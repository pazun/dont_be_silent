import React from 'react';
import { Layout, Typography, Card, Row, Col, Button } from 'antd';
import { PhoneOutlined, MessageOutlined, SafetyOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const EmergencyHelp = () => {
  return (
    <Content style={{ padding: '24px', minHeight: 280 }}>
      <Typography>
        <Title level={2}>Emergency Help Available 24/7</Title>
        <Paragraph>
          If you're in immediate danger, call <Text strong>999</Text> immediately.
          Your safety is our top priority. We're here to help you, and all our services are free and confidential.
        </Paragraph>
      </Typography>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} md={8}>
          <Card
            title={<><PhoneOutlined /> Helpline</>
            }
            bordered={false}
          >
            <Title level={3} style={{ color: '#DA2864' }}>8 707 520 05 19</Title>
            <Paragraph>
              Our trained support workers are available 24/7 to:
              <ul>
                <li>Listen without judgment</li>
                <li>Provide emotional support</li>
                <li>Help you understand your options</li>
                <li>Connect you with local services</li>
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