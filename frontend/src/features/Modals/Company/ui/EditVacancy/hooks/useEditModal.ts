import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditVacancyModalParams } from '../model/types';
import { ContentEditableEvent } from 'react-simple-wysiwyg';

export const useCreateVacancyModal = (vacancy: EditVacancyModalParams) => {
  const [formData, setFormData] = useState<EditVacancyModalParams>({
    title: vacancy.title,
    leastSalary: vacancy.leastSalary,
    highestSalary: vacancy.highestSalary,
    hardSkills: vacancy.hardSkills,
    description: vacancy.description,
  });

  const { t } = useTranslation('translation', {
    keyPrefix: 'modals.company.createVacancy.inputs',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEditorChange = (e: ContentEditableEvent) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      description: e.target.value,
    }));
  };

  const inputs = [
    {
      value: formData.title,
      type: 'text',
      name: 'title',
      onChange: handleChange,
      placeholder: t('title'),
    },
    {
      value: formData.leastSalary,
      type: 'text',
      name: 'leastSalary',
      onChange: handleChange,
      placeholder: t('leastSalary'),
    },
    {
      value: formData.highestSalary,
      type: 'text',
      name: 'highestSalary',
      onChange: handleChange,
      placeholder: t('highestSalary'),
    },
    {
      value: formData.hardSkills,
      type: 'text',
      name: 'hardSkills',
      onChange: handleChange,
      placeholder: t('hardSkills'),
    },
  ];

  const editors = [
    {
      name: 'description',
      value: formData.description,
      placeholder: t('description'),
      onChange: handleEditorChange,
    },
  ];

  return { inputs, editors, formData };
};
