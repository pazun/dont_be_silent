import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

const Requests = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/donations/all-donations')
      .then(res => res.json())
      .then(data => setDonations(data))
      .catch(err => console.error(err));
  }, []);

  const columns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount}`
    }
  ];

  return <Table columns={columns} dataSource={donations} />;
};

export default Requests;