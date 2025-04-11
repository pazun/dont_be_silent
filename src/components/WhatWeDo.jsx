import React from 'react';
import { Layout, Typography, Card, Row, Col, Timeline } from 'antd';
import { SafetyCertificateOutlined, TeamOutlined, BulbOutlined, HeartOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const WhatWeDo = () => {
  return (
    <Content style={{ padding: '24px', minHeight: 280 }}>
      <Typography>
        <Title level={2}>What We Do</Title>
        <Paragraph>
          At Don't Be Silent, we work tirelessly to support survivors of domestic abuse and create
          lasting change in our community. Our comprehensive approach combines immediate crisis
          support with long-term prevention strategies.
        </Paragraph>
      </Typography>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} md={12}>
          <Card
            title={<><SafetyCertificateOutlined /> Our Mission</>
            }
            bordered={false}
          >
            <Paragraph>
              We are committed to:
              <ul>
                <li>Providing immediate support to those experiencing domestic abuse</li>
                <li>Creating awareness about domestic abuse in our communities</li>
                <li>Advocating for stronger protection and support for survivors</li>
                <li>Preventing future abuse through education and intervention</li>
              </ul>
            </Paragraph>
          </Card>

          <Card
            title={<><TeamOutlined /> Our Approach</>
            }
            style={{ marginTop: '16px' }}
            bordered={false}
          >
            <Timeline
              items={[
                {
                  color: '#DA2864',
                  children: (
                    <>
                      <Title level={4}>Crisis Response</Title>
                      <Paragraph>
                        24/7 helpline, emergency accommodation, and immediate safety planning
                      </Paragraph>
                    </>
                  ),
                },
                {
                  color: '#DA2864',
                  children: (
                    <>
                      <Title level={4}>Support & Recovery</Title>
                      <Paragraph>
                        Counseling services, support groups, and practical assistance
                      </Paragraph>
                    </>
                  ),
                },
                {
                  color: '#DA2864',
                  children: (
                    <>
                      <Title level={4}>Prevention & Education</Title>
                      <Paragraph>
                        Community workshops, school programs, and professional training
                      </Paragraph>
                    </>
                  ),
                },
                {
                  color: '#DA2864',
                  children: (
                    <>
                      <Title level={4}>Advocacy & Change</Title>
                      <Paragraph>
                        Policy advocacy, research, and public awareness campaigns
                      </Paragraph>
                    </>
                  ),
                },
              ]}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title={<><BulbOutlined /> Our Services</>
            }
            bordered={false}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card bordered={false} style={{ background: '#FFF4F4' }}>
                  <Title level={4}>Crisis Support</Title>
                  <ul>
                    <li>24/7 Helpline</li>
                    <li>Emergency Accommodation</li>
                    <li>Safety Planning</li>
                    <li>Crisis Intervention</li>
                  </ul>
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false} style={{ background: '#FFF4F4' }}>
                  <Title level={4}>Counseling</Title>
                  <ul>
                    <li>Individual Counseling</li>
                    <li>Group Support</li>
                    <li>Children's Services</li>
                    <li>Trauma Support</li>
                  </ul>
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false} style={{ background: '#FFF4F4' }}>
                  <Title level={4}>Practical Help</Title>
                  <ul>
                    <li>Legal Support</li>
                    <li>Housing Assistance</li>
                    <li>Financial Advice</li>
                    <li>Court Accompaniment</li>
                  </ul>
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false} style={{ background: '#FFF4F4' }}>
                  <Title level={4}>Prevention</Title>
                  <ul>
                    <li>Education Programs</li>
                    <li>Training Workshops</li>
                    <li>Community Outreach</li>
                    <li>Awareness Campaigns</li>
                  </ul>
                </Card>
              </Col>
            </Row>
          </Card>

          <Card
            title={<><HeartOutlined /> Our Impact</>
            }
            style={{ marginTop: '16px' }}
            bordered={false}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Paragraph strong style={{ fontSize: '24px', color: '#DA2864' }}>
                  24/7
                </Paragraph>
                <Paragraph>Support Available</Paragraph>
              </Col>
              <Col span={12}>
                <Paragraph strong style={{ fontSize: '24px', color: '#DA2864' }}>
                  1000+
                </Paragraph>
                <Paragraph>People Helped Annually</Paragraph>
              </Col>
              <Col span={12}>
                <Paragraph strong style={{ fontSize: '24px', color: '#DA2864' }}>
                  100+
                </Paragraph>
                <Paragraph>Trained Volunteers</Paragraph>
              </Col>
              <Col span={12}>
                <Paragraph strong style={{ fontSize: '24px', color: '#DA2864' }}>
                  50+
                </Paragraph>
                <Paragraph>Community Partners</Paragraph>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default WhatWeDo;