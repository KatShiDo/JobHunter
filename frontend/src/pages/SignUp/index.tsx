import { SignUpForm } from '@/features';
import { PageTitle } from '@/shared';
import { useTranslation } from 'react-i18next';

export const SignUpPage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'title',
  });
  return (
    <>
      <PageTitle title={t('signUp')} />
      <SignUpForm />
    </>
  );
};
