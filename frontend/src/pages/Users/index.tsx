import { PageTitle, Typography } from '@/shared';
import { UserTable } from '@/widgets/Tables';
import { useTranslation } from 'react-i18next';

export const UsersPage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'title',
  });
  return (
    <>
      <PageTitle title={t('users')} />
      <Typography variant="h1">{t('users')}</Typography>
      <UserTable />
    </>
  );
};
