import React, { useEffect } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

const { Title, Text } = Typography;

const Payment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();

  const donationAmount = location.state?.amount;

  useEffect(() => {
    if (donationAmount) {
      form.setFieldsValue({
        amount: donationAmount,
      });
    }
  }, [donationAmount, form]);

  const onFinish = async (values) => { 
    console.log('Payment form values:', values);
    console.log('Donation Amount:', donationAmount);

    const token = localStorage.getItem('token');
    if (!token) {
      message.error('You need to be logged in to make a donation.');
      navigate('/signin');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: donationAmount,
          type: 'one-time' 
        })
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Donation recorded successfully!');
        navigate('/donation-history'); 
      } else {
        message.error(data.error || 'Failed to record donation.');
      }
    } catch (error) {
      console.error('Error recording donation:', error);
      message.error('Failed to connect to the server.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px' }}>
      <Card>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
          {t('payment.title')}
        </Title>

        <Form
          form={form}
          name="payment"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label={t('payment.cardHolder')}
            name="cardHolder"
            rules={[{ required: true, message: t('payment.cardHolderRequired') }]}
          >
            <Input placeholder={t('payment.cardHolderPlaceholder')} />
          </Form.Item>

          <Form.Item
            label={t('payment.cardNumber')}
            name="cardNumber"
            rules={[{ required: true, message: t('payment.cardNumberRequired') }]}
          >
            <Input placeholder="1234 5678 9012 3456" />
          </Form.Item>

          <div style={{ display: 'flex', gap: '16px' }}>
            <Form.Item
              label={t('payment.expiryDate')}
              name="expiryDate"
              rules={[{ required: true, message: t('payment.expiryDateRequired') }]}
              style={{ flex: 1 }}
            >
              <Input placeholder="MM/YY" />
            </Form.Item>

            <Form.Item
              label={t('payment.cvv')}
              name="cvv"
              rules={[{ required: true, message: t('payment.cvvRequired') }]}
              style={{ flex: 1 }}
            >
              <Input placeholder="123" />
            </Form.Item>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <Text strong>{t('payment.amount')}:</Text>
            <br />
            <Text style={{ fontSize: '2em', fontWeight: 'bold' }}>
              {donationAmount}₸
            </Text>
          </div>


          <Form.Item style={{ marginTop: '24px' }}>
            <Button type="primary" htmlType="submit" block>
              {t('payment.submitButton')}
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="link" onClick={() => navigate(-1)} block>
              {t('payment.cancelButton')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Payment;