import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditModalParams } from '../model/types';

export const useEditModal = (user: EditModalParams) => {
  const [formData, setFormData] = useState<EditModalParams>({
    middlename: user?.middlename || '',
    username: user?.username || '',
    email: user?.email || '',
    role: user?.role || '',
  });

  useEffect(() => {
    setFormData({
      middlename: user?.middlename || '',
      username: user?.username || '',
      email: user?.email || '',
      role: user?.role || '',
    });
  }, [user]);

  const { t } = useTranslation('translation', {
    keyPrefix: 'modals.users.edit.inputs',
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
      name: 'middlename',
      placeholder: t('middlename'),
      type: 'text',
      value: formData.middlename,
      onChange: handleChange,
    },
    {
      name: 'username',
      placeholder: t('username'),
      type: 'text',
      value: formData.username,
      onChange: handleChange,
    },
    {
      name: 'email',
      placeholder: t('email'),
      type: 'text',
      value: formData.email,
      onChange: handleChange,
    },
    {
      name: 'role',
      placeholder: t('role'),
      type: 'text',
      value: formData.role,
      onChange: handleChange,
    },
  ];

  return { inputs, formData };
};
