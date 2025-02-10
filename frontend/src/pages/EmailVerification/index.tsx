import { EmailVerificationForm } from '@/features';
import { PageTitle } from '@/shared';
import { useTranslation } from 'react-i18next';

export const EmailVerificationPage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'title',
  });

  return (
    <>
      <PageTitle title={t('emailVerification')} />
      <EmailVerificationForm />
    </>
  );
};
