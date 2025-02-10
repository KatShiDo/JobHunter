import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChangePasswordParams } from '../model/types';

export const useChangePasswordForm = () => {
  const [formData, setFormData] = useState<ChangePasswordParams>({
    password: '',
    repeatPassword: '',
  });

  const { t } = useTranslation('translation', {
    keyPrefix: 'userForms.inputs',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const inputs = [
    {
      name: 'password',
      placeholder: t('password'),
      type: 'password',
      value: formData.password,
      onChange: handleChange,
    },
    {
      name: 'repeatPassword',
      placeholder: t('repeatPassword'),
      type: 'password',
      value: formData.repeatPassword,
      onChange: handleChange,
    },
  ];

  return { inputs, formData };
};
