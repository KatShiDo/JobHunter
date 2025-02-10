import { useState } from 'react';
import { ProfileParams } from '../model/types';
import { useAppSelector } from '@/app/model/store';
import { useTranslation } from 'react-i18next';

export const useProfileForm = () => {
  const [errors, setErrors] = useState({});

  const { t } = useTranslation('translation', { keyPrefix: 'profile.inputs' });
  const profile = useAppSelector(state => state.userReducer.user);

  const initialValues: ProfileParams = {
    email: profile?.email || '',
    username: profile?.username || '',
    middlename: profile?.middlename || '',
    address: profile?.company?.address || '',
  };

  const [formData, setFormData] = useState<ProfileParams>(initialValues);

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', username: '', middlename: '', address: '' };

    if (!formData.email) {
      newErrors.email = t('validate.emailRequired');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('validate.invalidEmail');
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const resetFormData = () => {
    setFormData(initialValues);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const inputs = profile?.company
    ? [
        {
          name: 'username',
          type: 'text',
          value: formData.username,
          placeholder: t('username'),
          onChange: handleChange,
        },
        {
          name: 'middlename',
          type: 'text',
          value: formData.middlename,
          placeholder: t('middlename'),
          onChange: handleChange,
        },
        {
          name: 'email',
          type: 'email',
          value: formData.email,
          placeholder: t('email'),
          onChange: handleChange,
        },
        {
          name: 'address',
          type: 'text',
          value: formData.address,
          placeholder: t('address'),
          onChange: handleChange,
        },
      ]
    : [
        {
          name: 'middlename',
          type: 'text',
          value: formData.middlename,
          placeholder: t('middlename'),
          onChange: handleChange,
        },
        {
          name: 'email',
          type: 'email',
          value: formData.email,
          placeholder: t('email'),
          onChange: handleChange,
        },
      ];

  return { inputs, formData, validate, errors, initialValues, resetFormData };
};
