import React from 'react';
import Counter from '../components/Counter';
import { Layout, Typography, Card, Row, Col, Button } from 'antd';
import { HeartOutlined } from '@ant-design/icons';


const { Content } = Layout;
const { Title, Paragraph } = Typography;

const HomePage = () => (
  <Content style={{ padding: '24px', minHeight: 280 }}>
    <Typography>
      <Title level={1}>Welcome to Don't Be Silent</Title>
      <Paragraph style={{ fontSize: '18px' }}>
        This project helps people to avoid abuse and find support when they need it most.
      </Paragraph>
    </Typography>

    <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
      <Col xs={24} md={16}>
        <Card
          title={<><HeartOutlined /> Support Our Mission</>
          }
          bordered={false}
        >
          <Counter />
          <Paragraph style={{ marginTop: '16px', textAlign: 'center' }}>
            Thank you for joining our community in the fight against domestic abuse
          </Paragraph>
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card bordered={false}>
          <Button type="primary" block size="large" style={{ marginBottom: '16px' }}>
            Get Help Now
          </Button>
          <Button block size="large">
            Learn More
          </Button>
        </Card>
      </Col>
    </Row>
  </Content>
);

  export default HomePage;