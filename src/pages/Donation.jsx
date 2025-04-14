import React from 'react';
import { Layout, Typography, Card, Row, Col, Button, Form, Input, InputNumber } from 'antd';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Donation = () => {
  const onFinish = (values) => {
    console.log('Donation form values:', values);
    // Here you would typically handle the donation processing
  };

  return (
    <Content style={{ padding: '24px', minHeight: 280 }}>
      <Typography>
        <Title level={2}>Support Our Cause</Title>
        <Paragraph>
          Your donation helps us maintain and expand our support services for those affected by abuse.
          Every contribution makes a difference in creating a safer community.
        </Paragraph>
      </Typography>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} md={12}>
          <Card title="One-time Donation" bordered={false}>
            <Form
              name="donation_form"
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                name="amount"
                label="Donation Amount ($)"
                rules={[{ required: true, message: 'Please input donation amount!' }]}
              >
                <InputNumber
                  min={1}
                  style={{ width: '100%' }}
                  placeholder="Enter amount"
                />
              </Form.Item>

              <Form.Item
                name="name"
                label="Your Name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Donate Now
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Why Donate?" bordered={false}>
            <Paragraph>
              Your donations help us:
            </Paragraph>
            <ul>
              <li>Maintain support helplines</li>
              <li>Provide educational resources</li>
              <li>Organize community outreach programs</li>
              <li>Support abuse survivors</li>
            </ul>
            <Paragraph>
              All donations are securely processed and used directly to support our mission.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Donation;