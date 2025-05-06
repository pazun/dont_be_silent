import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (value) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select
      defaultValue={i18n.language}
      style={{ width: 120 }}
      onChange={handleLanguageChange}
    >
      <Option value="en">English</Option>
      <Option value="ru">Русский</Option>
      <Option value="kz">Qazaqşa</Option>
    </Select>
  );
};

export default LanguageSwitcher;