import React from 'react';
import { Layout, Typography, Card, Row, Col, Timeline } from 'antd';
import { SafetyCertificateOutlined, TeamOutlined, BulbOutlined, HeartOutlined } from '@ant-design/icons';
import Counter from '../components/Counter';
import { useTranslation } from 'react-i18next';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const WhatWeDo = () => {
  const { t } = useTranslation();

  return (
    <Content style={{ padding: '24px', minHeight: 280 }}>
      <Typography>
        <Title level={2}>{t('whatWeDo.title', 'What We Do')}</Title>
        <Paragraph>
          {t('whatWeDo.description', 'At Don\'t Be Silent, we work tirelessly to support survivors of domestic abuse and create lasting change in our community. Our comprehensive approach combines immediate crisis support with long-term prevention strategies.')}
        </Paragraph>
      </Typography>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} md={12}>
          <Card
            title={<><SafetyCertificateOutlined /> {t('whatWeDo.mission.title', 'Our Mission')}</>}
            bordered={false}
          >
            <Paragraph>
              {t('whatWeDo.mission.intro', 'We are committed to:')}
              <ul>
                {t('whatWeDo.mission.points', { returnObjects: true }).map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </Paragraph>
          </Card>

          <Card
            title={<><TeamOutlined /> {t('whatWeDo.approach.title', 'Our Approach')}</>}
            style={{ marginTop: '16px' }}
            bordered={false}
          >
            <Timeline
              items={[
                {
                  color: '#DA2864',
                  children: (
                    <>
                      <Title level={4}>{t('whatWeDo.approach.crisis.title', 'Crisis Response')}</Title>
                      <Paragraph>
                        {t('whatWeDo.approach.crisis.description', '24/7 helpline, emergency accommodation, and immediate safety planning')}
                      </Paragraph>
                    </>
                  ),
                },
                {
                  color: '#DA2864',
                  children: (
                    <>
                      <Title level={4}>{t('whatWeDo.approach.support.title', 'Support & Recovery')}</Title>
                      <Paragraph>
                        {t('whatWeDo.approach.support.description', 'Counseling services, support groups, and practical assistance')}
                      </Paragraph>
                    </>
                  ),
                },
                {
                  color: '#DA2864',
                  children: (
                    <>
                      <Title level={4}>{t('whatWeDo.approach.prevention.title', 'Prevention & Education')}</Title>
                      <Paragraph>
                        {t('whatWeDo.approach.prevention.description', 'Community workshops, school programs, and professional training')}
                      </Paragraph>
                    </>
                  ),
                },
                {
                  color: '#DA2864',
                  children: (
                    <>
                      <Title level={4}>{t('whatWeDo.approach.advocacy.title', 'Advocacy & Change')}</Title>
                      <Paragraph>
                        {t('whatWeDo.approach.advocacy.description', 'Policy advocacy, research, and public awareness campaigns')}
                      </Paragraph>
                      <Counter />
                    </>
                  ),
                },
              ]}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title={<><BulbOutlined /> {t('whatWeDo.services.title', 'Our Services')}</>}
            bordered={false}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card bordered={false} style={{ background: '#FFF4F4' }}>
                  <Title level={4}>{t('whatWeDo.services.crisis.title', 'Crisis Support')}</Title>
                  <ul>
                    {t('whatWeDo.services.crisis.points', { returnObjects: true }).map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false} style={{ background: '#FFF4F4' }}>
                  <Title level={4}>{t('whatWeDo.services.counseling.title', 'Counseling')}</Title>
                  <ul>
                    {t('whatWeDo.services.counseling.points', { returnObjects: true }).map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false} style={{ background: '#FFF4F4' }}>
                  <Title level={4}>{t('whatWeDo.services.practical.title', 'Practical Help')}</Title>
                  <ul>
                    {t('whatWeDo.services.practical.points', { returnObjects: true }).map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false} style={{ background: '#FFF4F4' }}>
                  <Title level={4}>{t('whatWeDo.services.prevention.title', 'Prevention')}</Title>
                  <ul>
                    {t('whatWeDo.services.prevention.points', { returnObjects: true }).map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </Card>
              </Col>
            </Row>
          </Card>

          <Card
            title={<><HeartOutlined /> {t('whatWeDo.impact.title', 'Our Impact')}</>}
            style={{ marginTop: '16px' }}
            bordered={false}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Paragraph strong style={{ fontSize: '24px', color: '#DA2864' }}>
                  24/7
                </Paragraph>
                <Paragraph>{t('whatWeDo.impact.support', 'Support Available')}</Paragraph>
              </Col>
              <Col span={12}>
                <Paragraph strong style={{ fontSize: '24px', color: '#DA2864' }}>
                  1000+
                </Paragraph>
                <Paragraph>{t('whatWeDo.impact.helped', 'People Helped Annually')}</Paragraph>
              </Col>
              <Col span={12}>
                <Paragraph strong style={{ fontSize: '24px', color: '#DA2864' }}>
                  100+
                </Paragraph>
                <Paragraph>{t('whatWeDo.impact.volunteers', 'Trained Volunteers')}</Paragraph>
              </Col>
              <Col span={12}>
                <Paragraph strong style={{ fontSize: '24px', color: '#DA2864' }}>
                  50+
                </Paragraph>
                <Paragraph>{t('whatWeDo.impact.partners', 'Community Partners')}</Paragraph>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default WhatWeDo;