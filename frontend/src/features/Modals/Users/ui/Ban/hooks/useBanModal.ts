import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BanModalParams } from '../model/types';

export const useBanModal = () => {
  const [formData, setFormData] = useState<BanModalParams>({
    expiresAt: '',
    reason: '',
  });

  const { t } = useTranslation('translation', {
    keyPrefix: 'modals.users.ban.inputs',
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
      name: 'expiresAt',
      placeholder: t('date'),
      type: 'date',
      onChange: handleChange,
    },
    {
      name: 'reason',
      placeholder: t('reason'),
      type: 'text',
      onChange: handleChange,
    },
  ];

  return { inputs, formData };
};
