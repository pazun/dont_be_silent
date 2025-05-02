import React, { useState } from 'react';
import { Layout, Typography, Card, Row, Col, Button, Form, Input, Tabs, message } from 'antd';
import { useSelector } from 'react-redux';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Donation = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const donationAmounts = [100, 500, 1000, 1500, 5000, 10000];
  const counterValue = useSelector((state) => state.counter.value);

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
  };

  const handleUseCounterValue = () => {
    setSelectedAmount(counterValue);
  };

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: selectedAmount,
          user_id: userInfo?.id,
          name: userInfo?.name,
          email: userInfo?.email
        })
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Thank you for your donation!');
        setSelectedAmount(null);
      } else {
        message.error(data.error || 'Failed to process donation');
      }
    } catch (error) {
      message.error('Failed to connect to server');
    }
  };

  const items = [
    {
      key: 'monthly',
      label: 'Give Monthly',
      children: (
        <div>
          <div style={{ marginBottom: '24px' }}>
            <Title level={4} style={{ marginBottom: '16px' }}>1.Amount  2.Details  3.Payment</Title>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
              {donationAmounts.map((amount) => (
                <Button
                  key={amount}
                  style={{
                    backgroundColor: selectedAmount === amount ? '#a78bfa' : '#a78bfa',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    height: '48px'
                  }}
                  onClick={() => handleAmountSelect(amount)}
                >
                  {amount}₸
                </Button>
              ))}
            </div>
            <Input
              prefix="₸"
              placeholder="Other payment"
              style={{ width: '100%', marginBottom: '16px' }}
              value={selectedAmount || ''}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  setSelectedAmount(value);
                }
              }}
            />
            <Button 
              type="primary" 
              block 
              size="large"
              onClick={onFinish}
              disabled={!selectedAmount}
            >
              Donate Now
            </Button>
          </div>
          <div style={{ marginTop: '24px' }}>
            <Paragraph>
              ₸5000 a month could help keep our Helpline running throughout the year
              so whenever a woman calls us fearing for her life, we can be there to support her.
            </Paragraph>
            <Paragraph>
              ₸10,000 a month could buy essentials for children arriving in our refuges,
              including blankets, pyjamas, and toiletries, to replace what they had to leave behind.
            </Paragraph>
          </div>
        </div>
      ),
    },
    {
      key: 'once',
      label: 'Give Just Once',
      children: 'Give Just Once Content',
    },
  ];

  return (
    <Content style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Card bordered={false}>
        <Tabs
          defaultActiveKey="zerocom"
          items={items}
          style={{
            '.ant-tabs-tab': {
              fontSize: '24px',
              padding: '16px 24px',
            }
          }}
        />
        <div style={{ marginTop: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Button 
            type="primary" 
            onClick={handleUseCounterValue}
          >
            Use Counter Value
          </Button>
          <Paragraph style={{ margin: 0 }}>
            Current donation counter: {counterValue}₸
          </Paragraph>
        </div>
      </Card>
    </Content>
  );
};

export default Donation;