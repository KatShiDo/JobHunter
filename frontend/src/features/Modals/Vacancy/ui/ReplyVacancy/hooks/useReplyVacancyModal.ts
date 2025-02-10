import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReplyVacancyModalParams } from '../model/types';

export const useReplyVacancyModal = () => {
  const [formData, setFormData] = useState<ReplyVacancyModalParams>({
    skills: '',
    description: '',
  });

  const { t } = useTranslation('translation', {
    keyPrefix: 'modals.vacancy.reply.inputs',
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
      value: formData.skills,
      type: 'text',
      name: 'skills',
      onChange: handleChange,
      placeholder: t('skills'),
    },
    {
      value: formData.description,
      type: 'text',
      name: 'description',
      onChange: handleChange,
      placeholder: t('description'),
    },
  ];

  return { inputs, formData };
};
