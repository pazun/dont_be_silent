import React, { useState, useEffect } from 'react';
import { Layout, Typography, Card, Row, Col, Statistic, Table, Spin, Button, message } from 'antd';
import { UserOutlined, DollarOutlined, HeartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalUsers: 0,
    recentDonations: []
  });

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/signin');
          return;
        }

        const response = await fetch('http://localhost:3000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const userData = await response.json();
        
        if (!userData || userData.name !== 'Admin') {
          navigate('/');
          return;
        }

        fetchAdminData();
      } catch (error) {
        console.error('Error checking admin access:', error);
        navigate('/');
      }
    };

    checkAdminAccess();
  }, [navigate]);

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Fetch total donations
      const donationsResponse = await fetch('http://localhost:3000/api/donations/total', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const donationsData = await donationsResponse.json();

      // Fetch recent donations
      const recentDonationsResponse = await fetch('http://localhost:3000/api/donations/all-donations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const recentDonationsData = await recentDonationsResponse.json();

      setStats({
        totalDonations: donationsData.total || 0,
        recentDonations: recentDonationsData || []
      });
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'donation_date',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `${amount}₸`
    },
    {
      title: 'Donor',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="link" 
          danger
          onClick={() => handleDelete(record.id)}
        >
          Delete
        </Button>
      )
    }
  ];

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Authentication required');
        return;
      }

      const response = await fetch(`http://localhost:3000/api/donations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        message.success('Donation deleted successfully');
        // Refresh the data
        fetchAdminData();
      } else {
        message.error('Failed to delete donation');
      }
    } catch (error) {
      console.error('Error deleting donation:', error);
      message.error('Failed to delete donation');
    }
  };

  return (
    <Content style={{ padding: '24px', minHeight: 280 }}>
      <Title level={2}>Admin Dashboard</Title>
      <Paragraph>
        Welcome to the admin dashboard. Here you can monitor the app's performance and user activities.
      </Paragraph>

      <Spin spinning={loading}>
        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24} sm={12} lg={8}>
            <Card>
              <Statistic
                title="Total Donations"
                value={stats.totalDonations}
                prefix={<DollarOutlined />}
                suffix="₸"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card>
              <Statistic
                title="Donations made"
                value={stats.recentDonations.length}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card>
              <Statistic
                title="Support Cases"
                value={0}
                prefix={<HeartOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <Card title="Recent Donations" style={{ marginTop: '24px' }}>
          <Table
            columns={columns}
            dataSource={stats.recentDonations}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </Spin>
    </Content>
  );
};

export default Admin;