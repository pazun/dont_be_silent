import React from 'react';
import { Layout, Typography, Card, Row, Col, Button } from 'antd';
import { HeartOutlined, TeamOutlined, SoundOutlined, DollarOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Support = () => {
  return (
    <Content style={{ padding: '24px', minHeight: 280 }}>
      <Typography>
        <Title level={2}>Ways to Support</Title>
        <Paragraph>
          Your support helps us continue our vital work in supporting those affected by domestic abuse.
          There are many ways you can make a difference in the lives of survivors.
        </Paragraph>
      </Typography>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} md={12} lg={6}>
          <Card
            title={<><DollarOutlined /> Donate</>
            }
            bordered={false}
            style={{ height: '100%' }}
          >
            <Paragraph>
              Your financial support helps us:
              <ul>
                <li>Maintain our 24/7 helpline</li>
                <li>Provide emergency accommodation</li>
                <li>Offer counseling services</li>
                <li>Develop educational programs</li>
              </ul>
            </Paragraph>
            <Button type="primary" block>
              Make a Donation
            </Button>
          </Card>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Card
            title={<><TeamOutlined /> Volunteer</>
            }
            bordered={false}
            style={{ height: '100%' }}
          >
            <Paragraph>
              Join our team of dedicated volunteers:
              <ul>
                <li>Helpline support</li>
                <li>Community outreach</li>
                <li>Event organization</li>
                <li>Administrative support</li>
              </ul>
            </Paragraph>
            <Button type="primary" block>
              Become a Volunteer
            </Button>
          </Card>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Card
            title={<><SoundOutlined /> Raise Awareness</>
            }
            bordered={false}
            style={{ height: '100%' }}
          >
            <Paragraph>
              Help spread the word:
              <ul>
                <li>Share our social media posts</li>
                <li>Organize awareness events</li>
                <li>Distribute information</li>
                <li>Start conversations</li>
              </ul>
            </Paragraph>
            <Button type="primary" block>
              Get Resources
            </Button>
          </Card>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Card
            title={<><HeartOutlined /> Corporate Partnership</>
            }
            bordered={false}
            style={{ height: '100%' }}
          >
            <Paragraph>
              Partner with us through:
              <ul>
                <li>Corporate donations</li>
                <li>Sponsored events</li>
                <li>Employee matching</li>
                <li>Pro-bono services</li>
              </ul>
            </Paragraph>
            <Button type="primary" block>
              Partner With Us
            </Button>
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: '24px' }}>
        <Title level={3}>Impact of Your Support</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card bordered={false}>
              <Title level={4}>24/7 Helpline</Title>
              <Paragraph>
                Your support helps us maintain our round-the-clock helpline service,
                ensuring help is always available when needed.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered={false}>
              <Title level={4}>Support Services</Title>
              <Paragraph>
                We provide counseling, legal advice, and practical support to
                hundreds of survivors each year.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered={false}>
              <Title level={4}>Prevention Programs</Title>
              <Paragraph>
                Our educational programs help prevent abuse by raising awareness
                and promoting healthy relationships.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Card>
    </Content>
  );
};

export default Support;