import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Popup, UserForm } from '@/shared';
import { useAppDispatch, useAppSelector } from '@/app/model/store';
import { useSignUpForm } from './hooks/useSignUpForm';
import { fetchRegister, isAuthSelector } from '../../model';
import { Navigate } from 'react-router-dom';

export const SignUpForm = () => {
  const [isOpenErrorPopup, setOpenErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(isAuthSelector);

  const { inputs, formData, validate } = useSignUpForm();

  const { t } = useTranslation('translation', {
    keyPrefix: 'userForms',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      setIsLoading(true);
      const result = await dispatch(fetchRegister(formData));
      setIsLoading(false);
      if (fetchRegister.rejected.match(result)) {
        switch (result.payload as string) {
          case 'USER_ALREADY_EXISTS':
            setErrorMessage(t('signUp.error.userAlreadyExists'));
            break;
          default:
            setErrorMessage(t('signUp.error.description'));
        }
        setOpenErrorPopup(true);
      }
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
        description={errorMessage || t('signUp.error.default')}
        submitText={t('signUp.error.button')}
      />
      <UserForm
        title={t('title.signUp')}
        inputs={inputs}
        submitText={t('submitText.signUp')}
        onSubmit={handleSubmit}
        loading={isLoading}
        visibleHelpAuth
        altText={t('alternativeAuth.signUp.title')}
        altLinkText={t('alternativeAuth.signUp.link')}
        altLink="/sign-in"
      />
    </>
  );
};
