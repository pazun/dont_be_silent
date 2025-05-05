import React, { useEffect, useState } from 'react';
import { Layout, Table, Typography, Card, Select } from 'antd';
import { DollarOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterUser, setFilterUser] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      try {
        const url = filterUser 
          ? `http://localhost:3000/api/donations/all-donations?user=${filterUser}`
          : 'http://localhost:3000/api/donations/all-donations';
        
        const response = await fetch(url);
        const data = await response.json();
        setDonations(data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [filterUser]);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'donation_date',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.donation_date) - new Date(b.donation_date),
      defaultSortOrder: 'descend'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `${amount}₸`,
      sorter: (a, b) => a.amount - b.amount
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Donor',
      dataIndex: 'name',
      key: 'name'
    }
  ];

  return (
    <Content style={{ padding: '24px', minHeight: 280 }}>
      <Card bordered={false}>
        <Title level={2} style={{ marginBottom: '24px' }}>
          <DollarOutlined /> All Donations
        </Title>
        <div style={{ marginBottom: 16 }}>
          <Select
            placeholder="Filter by user"
            style={{ width: 200 }}
            allowClear
            onChange={setFilterUser}
          >
            {[...new Set(donations.map(d => d.name))].map(name => (
              <Option key={name} value={name}>{name}</Option>
            ))}
          </Select>
        </div>
        <Table
          columns={columns}
          dataSource={donations}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </Content>
  );
};

export default DonationHistory;