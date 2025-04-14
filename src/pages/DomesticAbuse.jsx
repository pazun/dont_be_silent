import React from 'react';
import { Layout, Typography, Card, Collapse, Row, Col } from 'antd';
import { WarningOutlined, HeartOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const DomesticAbuse = () => {
  return (
    <Content style={{ padding: '24px', minHeight: 280 }}>
      <Typography>
        <Title level={2}>Understanding Domestic Abuse</Title>
        <Paragraph>
          Domestic abuse can affect anyone, regardless of age, gender, ethnicity, or social background.
          Understanding the different forms of abuse and recognizing the warning signs is crucial for
          both prevention and seeking help.
        </Paragraph>
      </Typography>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} md={12}>
          <Card
            title={<><WarningOutlined /> Types of Abuse</>
            }
            bordered={false}
          >
            <Collapse defaultActiveKey={['1']}>
              <Panel header="Physical Abuse" key="1">
                <Paragraph>
                  Physical abuse includes but is not limited to:
                  <ul>
                    <li>Hitting, slapping, or punching</li>
                    <li>Pushing or shoving</li>
                    <li>Restraining or imprisoning</li>
                    <li>Using weapons or objects to cause harm</li>
                  </ul>
                </Paragraph>
              </Panel>
              <Panel header="Emotional/Psychological Abuse" key="2">
                <Paragraph>
                  Forms of emotional abuse include:
                  <ul>
                    <li>Constant criticism and humiliation</li>
                    <li>Threats and intimidation</li>
                    <li>Isolation from friends and family</li>
                    <li>Controlling behavior</li>
                  </ul>
                </Paragraph>
              </Panel>
              <Panel header="Financial Abuse" key="3">
                <Paragraph>
                  Financial abuse may involve:
                  <ul>
                    <li>Controlling access to money</li>
                    <li>Forcing financial dependency</li>
                    <li>Taking loans in your name</li>
                    <li>Preventing work or education</li>
                  </ul>
                </Paragraph>
              </Panel>
            </Collapse>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title={<><HeartOutlined /> Warning Signs</>
            }
            bordered={false}
          >
            <Paragraph>
              Common warning signs of an abusive relationship:
            </Paragraph>
            <ul>
              <li>Extreme jealousy or possessiveness</li>
              <li>Quick involvement or pressure to commit</li>
              <li>Isolation from friends and family</li>
              <li>Controlling behavior and decision making</li>
              <li>Unpredictable mood swings</li>
              <li>Blaming you for their behavior</li>
              <li>Making threats or intimidating you</li>
              <li>Financial control or exploitation</li>
            </ul>
          </Card>
        </Col>
      </Row>

      <Card
        title={<><InfoCircleOutlined /> Impact of Domestic Abuse</>
        }
        style={{ marginTop: '24px' }}
        bordered={false}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Title level={4}>Physical Impact</Title>
            <ul>
              <li>Injuries and chronic health issues</li>
              <li>Sleep disturbances</li>
              <li>Eating disorders</li>
              <li>Physical exhaustion</li>
            </ul>
          </Col>
          <Col xs={24} md={8}>
            <Title level={4}>Emotional Impact</Title>
            <ul>
              <li>Depression and anxiety</li>
              <li>Post-traumatic stress</li>
              <li>Low self-esteem</li>
              <li>Fear and isolation</li>
            </ul>
          </Col>
          <Col xs={24} md={8}>
            <Title level={4}>Social Impact</Title>
            <ul>
              <li>Damaged relationships</li>
              <li>Social withdrawal</li>
              <li>Work/study difficulties</li>
              <li>Financial hardship</li>
            </ul>
          </Col>
        </Row>
      </Card>

      <Card style={{ marginTop: '24px', background: '#FFF4F4' }}>
        <Text strong>Remember: You are not alone, and it's not your fault.</Text>
        <Paragraph style={{ marginTop: '8px' }}>
          If you recognize any of these signs in your relationship or someone you know,
          reach out for help. Our support services are available 24/7, and all conversations
          are confidential.
        </Paragraph>
      </Card>
    </Content>
  );
};

export default DomesticAbuse;