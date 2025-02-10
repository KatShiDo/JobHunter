import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SignInParams } from '../model/types';

export const useSignInForm = () => {
  const [formData, setFormData] = useState<SignInParams>({
    email: '',
    password: '',
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
    {
      name: 'password',
      placeholder: t('password'),
      type: 'password',
      value: formData.password,
      onChange: handleChange,
    },
  ];

  return { inputs, formData };
};
