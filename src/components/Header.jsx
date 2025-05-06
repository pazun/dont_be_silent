import React from 'react';
import { Layout, Menu, Button, Typography } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '/Logo.svg';
import styles from '../styles/Header.module.css';

const { Header: AntHeader } = Layout;

const Header = ({ isMobile, customTheme }) => {
  const navigate = useNavigate();
  const location = window.location.pathname;
  const { t } = useTranslation();

  const menuItems = [
    {
      key: '/emergency-help',
      label: t('header.menu.emergencyHelp'),
    },
    {
      key: '/about-abuse',
      label: t('header.menu.aboutAbuse'),
    },
    {
      key: '/support',
      label: t('header.menu.support'),
    },
    {
      key: '/about',
      label: t('header.menu.aboutUs'),
    }
  ];

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  return (
    <AntHeader style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center', background: customTheme.token.colorBgHeader, height: 'auto', padding: '12px 24px', gap: '16px' }}>
      <div className={styles['header-logo-container']} style={{ flex: '0 0 auto' }}>
        <img 
          onClick={() => navigate('/')}
          src={Logo} alt="Logo" 
          className={styles['main-logo']} 
        />
        <img 
          onClick={() => navigate('/')}
          src="/Text.svg" 
          alt="Text Logo" 
          className={styles['text-logo']} 
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1', width: '100%' }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: isMobile ? '12px' : '0',
          gap: '16px'
        }}>
          <Typography.Text style={{
            color: '#DA2864',
            marginRight: isMobile ? '0' : '16px',
            textAlign: isMobile ? 'center' : 'left'
          }}>{t('header.needHelp')}</Typography.Text>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: isMobile ? '0' : '16px',
            justifyContent: isMobile ? 'center' : 'flex-start'
          }}>
            <PhoneOutlined style={{ fontSize: '24px', color: '#DA2864', marginRight: '8px' }} />
            <Typography.Text strong style={{ color: '#DA2864', fontSize: '20px' }}>8 707 520 05 19</Typography.Text>
          </div>
          <div style={{
            display: 'flex',
            gap: '16px',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'stretch',
            width: isMobile ? '100%' : 'auto',
            marginTop: isMobile ? '12px' : '0',
            maxWidth: isMobile ? '100%' : '400px',
            minWidth: isMobile ? 'auto' : '300px'
          }}>
            <Button 
              type="primary" 
              shape="round" 
              onClick={() => navigate('/Call')}
              icon={<PhoneOutlined />} 
              size="large" 
              style={{
                height: '48px',
                padding: '0 32px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              {t('header.callHelpline')}
            </Button>
            <Button 
              shape="round" 
              size="large" 
              onClick={() => navigate('/donation')}
              style={{
                background: customTheme.token.colorDonate,
                border: 'none',
                height: '48px',
                padding: '0 32px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {t('header.donate')}
            </Button>
          </div>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[location]}
          items={menuItems}
          style={{ background: 'transparent', justifyContent: 'flex-end', border: 'none', fontSize: '16px' }}
          onClick={handleMenuClick}
        />
      </div>
    </AntHeader>
  );
};

export default Header;