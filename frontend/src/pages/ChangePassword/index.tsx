import { ChangePasswordForm } from '@/features';
import { PageTitle } from '@/shared';
import { useTranslation } from 'react-i18next';

export const ChangePasswordPage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'title',
  });
  return (
    <>
      <PageTitle title={t('changePassword')} />
      <ChangePasswordForm/>
    </>
  );
};
