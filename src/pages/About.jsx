import React, { useState, useEffect } from 'react';
import { Layout, Typography, Card, Row, Col, Pagination, Spin } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import QuotesList from '../components/QuotesList';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const About = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 6;

  useEffect(() => {
    fetchQuotes();
  }, [currentPage]);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const skip = (currentPage - 1) * pageSize;
      const response = await fetch(`https://dummyjson.com/quotes?limit=${pageSize}&skip=${skip}`);
      const data = await response.json();
      setQuotes(data.quotes);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Content style={{ padding: '24px', minHeight: 280 }}>
      <Typography>
        <Title level={2}>About Don't Be Silent</Title>
        <Paragraph>
          Don't Be Silent is dedicated to supporting those affected by domestic abuse.
          Our mission is to provide a safe space for survivors, raise awareness about
          domestic abuse, and work towards creating a society free from violence.
        </Paragraph>
      </Typography>

      <Title level={3} style={{ marginTop: '24px' }}>
        <BookOutlined /> What people think about us
      </Title>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Spin size="large" />
          <Spin size="large" />
          <Spin size="large" />
          <Spin size="large" />
          <Spin size="large" />
          <Spin size="large" />
          <Spin size="large" />
          <Spin size="large" />
          <Spin size="large" />
        </div>
      ) : (
        <>
          <QuotesList quotes={quotes} />
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Pagination
              current={currentPage}
              total={total}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </>
      )}

      <Card style={{ marginTop: '24px', background: '#FFF4F4' }}>
        <Title level={4}>Our Values</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Title level={5}>Support</Title>
            <Paragraph>
              We provide comprehensive support services to help survivors rebuild their lives
              and find safety, healing, and hope.
            </Paragraph>
          </Col>
          <Col xs={24} md={8}>
            <Title level={5}>Education</Title>
            <Paragraph>
              Through education and awareness programs, we work to prevent domestic abuse
              and promote healthy relationships.
            </Paragraph>
          </Col>
          <Col xs={24} md={8}>
            <Title level={5}>Advocacy</Title>
            <Paragraph>
              We advocate for policies and practices that protect survivors and hold
              abusers accountable.
            </Paragraph>
          </Col>
        </Row>
      </Card>
    </Content>
  );
};

export default About;