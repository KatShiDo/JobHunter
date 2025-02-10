import { PageTitle, Typography } from '@/shared';
import { DashboardTable } from '@/widgets/Tables/Dashboard';
import { useTranslation } from 'react-i18next';

export const DashboardPage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'title',
  });
  return (
    <>
      <PageTitle title={t('dashboard')} />
      <Typography variant="h1">{t('dashboard')}</Typography>
      <DashboardTable />
    </>
  );
};
