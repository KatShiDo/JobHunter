import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Popup, UserForm } from '@/shared';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { changePassword } from '@/features/UserForms/ui/ChangePassword/api/post.ts';
import { useChangePasswordForm } from '@/features/UserForms/ui/ChangePassword/hooks/useChangePasswordForm.ts';

export const ChangePasswordForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { inputs, formData } = useChangePasswordForm();
  const { t } = useTranslation('translation', { keyPrefix: 'userForms' });

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const token = searchParams.get('token');
  if (!token) return <Navigate to={'/sign-in'} />;

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.repeatPassword) {
      setPopupOpen(true);
      setPopupMessage(t('changePassword.popup.notMatch'));
      return;
    }

    setLoading(true);
    try {
      const status = await changePassword(token, formData.password);
      setIsSuccess(status === 200);
      setPopupMessage(t(`changePassword.popup.${status === 200 ? 'success' : 'error'}`));
    } catch {
      setPopupMessage(t('changePassword.popup.error'));
    } finally {
      setLoading(false);
      setPopupOpen(true);
    }
  };

  const handlePopupSubmit = () => {
    setPopupOpen(false);
    if (isSuccess) navigate('/sign-in');
  };

  return (
    <>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        title={popupMessage}
        submitText={t('emailVerification.popup.button')}
        onSubmit={handlePopupSubmit}
      />
      <UserForm
        title={t('title.changePassword')}
        inputs={inputs}
        loading={isLoading}
        submitText={t('submitText.changePassword')}
        onSubmit={handleSubmit}
      />
    </>
  );
};