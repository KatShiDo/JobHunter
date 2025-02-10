import { useTranslation } from 'react-i18next';
import { SignInForm } from '@/features';
import { PageTitle } from '@/shared';

export const SignInPage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'title',
  });
  return (
    <>
      <PageTitle title={t('signIn')} />
      <SignInForm />
    </>
  );
};
