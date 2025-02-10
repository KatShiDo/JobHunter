import React from 'react';
import { useTranslation } from 'react-i18next';
import { Popup, UserForm } from '@/shared';
import { useAppDispatch, useAppSelector } from '@/app/model/store';
import { useSignInForm } from './hooks/useSignInForm';
import { fetchLogin } from '@/features/UserForms/model/';
import { isAuthSelector } from '@/features/UserForms/model/slice';
import { Navigate } from 'react-router-dom';

export const SignInForm = () => {
  const [isOpenErrorPopup, setOpenErrorPopup] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthSelector);

  const { inputs, formData } = useSignInForm();

  const { t } = useTranslation('translation', {
    keyPrefix: 'userForms',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = await dispatch(fetchLogin(formData));
    setLoading(false);
    if (!data.payload) {
      setOpenErrorPopup(true);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Popup
        isOpen={isOpenErrorPopup}
        onClose={() => setOpenErrorPopup(false)}
        onSubmit={() => setOpenErrorPopup(false)}
        title={t('signIn.error.title')}
        description={t('signIn.error.description')}
        submitText={t('signIn.error.button')}
      />
      <UserForm
        onSubmit={handleSubmit}
        title={t('title.signIn')}
        inputs={inputs}
        loading={isLoading}
        visibleForgotPassword
        submitText={t('submitText.signIn')}
        visibleLine
        visibleAlternativeAuth
        visibleHelpAuth
        altText={t('alternativeAuth.signIn.title')}
        altLinkText={t('alternativeAuth.signIn.link')}
        altLink="/sign-up"
      />
    </>
  );
};
