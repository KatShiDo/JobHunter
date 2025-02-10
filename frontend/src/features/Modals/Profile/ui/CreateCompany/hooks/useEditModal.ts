import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateCompanyModalParams } from '../model/types';

export const useCreateCompanyModal = () => {
  const [formData, setFormData] = useState<CreateCompanyModalParams>({
    name: '',
    address: '',
    description: '',
  });

  const { t } = useTranslation('translation', {
    keyPrefix: 'modals.profile.createCompany.inputs',
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
      name: 'name',
      placeholder: t('name'),
      type: 'text',
      value: formData.name,
      onChange: handleChange,
    },
    {
      name: 'address',
      placeholder: t('address'),
      type: 'text',
      value: formData.address,
      onChange: handleChange,
    },
    {
      name: 'description',
      placeholder: t('description'),
      type: 'text',
      value: formData.description,
      onChange: handleChange,
    },
  ];

  return { inputs, formData };
};
