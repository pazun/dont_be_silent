import React from 'react';
import { Row, Col, Card, Typography, Empty } from 'antd';

const { Paragraph } = Typography;

const QuotesList = ({ quotes }) => {
  if (!quotes.length) {
    return <Empty description="No quotes available" />;
  }

  return (
    <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
      {quotes.map((quote) => (
        <Col xs={24} sm={12} lg={8} key={quote.id}>
          <Card bordered={false} style={{ height: '100%' }}>
            <Paragraph style={{ fontSize: '16px', fontStyle: 'italic' }}>
              "{quote.quote}"
            </Paragraph>
            <Paragraph style={{ textAlign: 'right', marginBottom: 0 }}>
              - {quote.author}
            </Paragraph>
          </Card>
        </Col>
      ))}
    </Row>
  );
};


export default QuotesList;