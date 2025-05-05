import React from 'react';
import { notification } from 'antd';

const Notifications = () => {
  React.useEffect(() => {
    const checkAndShowNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('http://localhost:3000/api/settings', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const settings = await response.json();

        if (settings.notifications) {
          const notificationInterval = setInterval(() => {
            notification.info({
              message: 'Support Our Mission',
              description: 'Consider making a donation to help us continue our important work.',
              placement: 'bottomLeft',
              duration: 10,
              onClick: () => {
                window.location.href = '/donation';
              }
            });
          }, 60000);

          return () => clearInterval(notificationInterval);
        }
      } catch (error) {
        console.error('Error fetching notification settings:', error);
      }
    };

    checkAndShowNotifications();
  }, []);

  return null;
};

export default Notifications;