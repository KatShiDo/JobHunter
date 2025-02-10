import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SignUpParams } from '../model/types';

export const useSignUpForm = () => {
  const [formData, setFormData] = useState<SignUpParams>({
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
  });

  const { t } = useTranslation('translation', {
    keyPrefix: 'userForms.inputs',
  });

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', username: '', password: '', repeatPassword: '' };

    if (!formData.email) {
      newErrors.email = t('validate.emailRequired');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('validate.invalidEmail');
      valid = false;
    }

    if (!formData.username) {
      newErrors.username = t('validate.usernameRequired');
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = t('validate.passwordRequired');
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = t('validate.passwordMinLength');
      valid = false;
    }

    if (!formData.repeatPassword) {
      newErrors.repeatPassword = t('repeatPasswordRequired');
      valid = false;
    } else if (formData.repeatPassword !== formData.password) {
      newErrors.repeatPassword = t('validate.passwordsDoNotMatch');
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

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
      error: errors.email,
    },
    {
      name: 'username',
      placeholder: t('username'),
      type: 'text',
      value: formData.username,
      onChange: handleChange,
      error: errors.username,
    },
    {
      name: 'password',
      placeholder: t('password'),
      type: 'password',
      value: formData.password,
      onChange: handleChange,
      error: errors.password,
    },
    {
      name: 'repeatPassword',
      placeholder: t('repeatPassword'),
      type: 'password',
      value: formData.repeatPassword,
      onChange: handleChange,
      error: errors.repeatPassword,
    },
  ];

  return { inputs, formData, errors, validate };
};
