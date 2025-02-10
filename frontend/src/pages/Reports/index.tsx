import { PageTitle, Typography } from '@/shared';
import { ReportsTable } from '@/widgets';
import { useTranslation } from 'react-i18next';

export const ReportsPage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'title',
  });
  return (
    <>
      <PageTitle title={t('reports')} />
      <Typography variant="h1">{t('reports')}</Typography>
      <ReportsTable />
    </>
  );
};
