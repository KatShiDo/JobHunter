import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmailVerificationParams } from '../model/types';

export const useEmailVerificationForm = () => {
  const [formData, setFormData] = useState<EmailVerificationParams>({
    email: '',
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
      name: 'email',
      placeholder: t('email'),
      type: 'email',
      value: formData.email,
      onChange: handleChange,
    },
  ];

  return { inputs, formData };
};
