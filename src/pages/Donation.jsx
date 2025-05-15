import React, { useState, useEffect } from 'react';
import { Layout, Typography, Card, Row, Col, Button, Form, Input, Tabs, message } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Donation = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const donationAmounts = [100, 500, 1000, 1500, 5000, 10000];
  const counterValue = useSelector((state) => state.counter.value);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:3000/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          if (data) {
            setUserInfo(data);
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    };

    fetchUserInfo();
  }, []);

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
  };

  const handleUseCounterValue = () => {
    setSelectedAmount(counterValue);
  };

  const onFinish = async () => {
    if (!selectedAmount) {
      message.error(t('donation.selectAmountError'));
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error(t('donation.signInRequired'));
        return;
      }

      const response = await fetch('http://localhost:3000/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: selectedAmount,
          type: 'one-time'
        })
      });

      const data = await response.json();

      if (response.ok) {
        message.success(t('donation.successMessage'));
        setSelectedAmount(null);
      } else {
        message.error(data.error || t('donation.processError'));
      }
    } catch (error) {
      message.error(t('donation.connectionError'));
    }
  };

  const items = [
    {
      key: 'zero',
      label: t('donation.zeroFeesLabel'),
      children: (
        <div>
          <div style={{ marginBottom: '24px' }}>
            <Title level={4} style={{ marginBottom: '16px' }}>{t('donation.enterAmountTitle')}</Title>
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
              placeholder={t('donation.otherPaymentPlaceholder')}
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
              {t('donation.donateNowButton')}
            </Button>
          </div>
          <div style={{ marginTop: '24px' }}>
            <Paragraph>
              {t('donation.helplineDescription')}
            </Paragraph>
            <Paragraph>
              {t('donation.essentialsDescription')}
            </Paragraph>
          </div>
        </div>
      ),
    },
    {
      key: 'withcom',
      label: t('donation.withFeesLabel'),
      children: t('donation.noCommissionsMessage'),
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
            {t('donation.useCounterButton')}
          </Button>
          <Paragraph style={{ margin: 0 }}>
            {t('donation.currentCounterLabel')}: {counterValue}₸
          </Paragraph>
        </div>
      </Card>
    </Content>
  );
};

export default Donation;