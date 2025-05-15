import React from 'react';
import { Layout, Typography, Card, Button } from 'antd'; // Import Button
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const ConfidentialChat = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Get the navigate function

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Content style={{ padding: '24px', minHeight: 280, maxWidth: '800px', margin: '0 auto' }}>
      <Card bordered={false}>
        <Typography>
          <Title level={2}>{t('confidentialChat.title')}</Title>
          <Paragraph>
            {t('confidentialChat.intro')}
          </Paragraph>

          <Title level={4}>{t('confidentialChat.howItWorksTitle')}</Title>
          <Paragraph>
            {t('confidentialChat.howItWorksDescription')}
          </Paragraph>
          <ul>
            <li>{t('confidentialChat.point1')}</li>
            <li>{t('confidentialChat.point2')}</li>
            <li>{t('confidentialChat.point3')}</li>
            <li>{t('confidentialChat.point4')}</li>
          </ul>

          <Title level={4}>{t('confidentialChat.importantNotesTitle')}</Title>
          <Paragraph>
            {t('confidentialChat.importantNotesDescription')}
          </Paragraph>
          <ul>
            <li>{t('confidentialChat.note1')}</li>
            <li>{t('confidentialChat.note2')}</li>
            <li>{t('confidentialChat.note3')}</li>
          </ul>

          <Paragraph>
            {t('confidentialChat.closing')}
          </Paragraph>
        </Typography>
        <Button type="default" onClick={handleBack} style={{ marginTop: '24px' }}>
          {t('confidentialChat.backButton')} {/* Use translation key */}
        </Button>
      </Card>
    </Content>
  );
};

export default ConfidentialChat;