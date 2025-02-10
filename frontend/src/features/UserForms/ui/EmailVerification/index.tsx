import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Popup, UserForm } from '@/shared';
import { useEmailVerificationForm } from './hooks/useEmailVerificationForm';
import { forgotPassword, resendToken, verifyEmail } from './api/post.ts';

export const EmailVerificationForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { inputs, formData } = useEmailVerificationForm();
  const { t } = useTranslation('translation', { keyPrefix: 'userForms' });

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [type, setType] = useState('');

  useEffect(() => {
    setType(searchParams.get('type') || '');
    const token = searchParams.get('token');
    if (!token) return;

    setLoading(true);
    (async () => {
      try {
        const status = await verifyEmail(token);
        setIsSuccess(status === 200);
        setPopupMessage(
          t(`emailVerification.popup.${status === 200 ? 'success' : 'error'}`)
        );
      } catch {
        setPopupMessage(t('emailVerification.popup.error'));
      } finally {
        setLoading(false);
        setPopupOpen(true);
      }
    })();
  }, [searchParams, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    setLoading(true);
    try {
      let status;
      switch (type) {
        case 'forgotPassword':
          status = await forgotPassword(formData.email);
          setPopupMessage(t('emailVerification.popup.successSend'));
          break;
        default:
          status = await resendToken(formData.email);
          setPopupMessage(t('emailVerification.popup.resetSuccess'));
      }
      setIsSuccess(status === 200);
    } catch {
      setPopupMessage(t('emailVerification.popup.error'));
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
        title={t('title.emailVerification')}
        inputs={inputs}
        loading={isLoading}
        submitText={t('submitText.submit')}
        onSubmit={handleSubmit}
      />
    </>
  );
};
