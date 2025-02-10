import { PageTitle, Typography } from '@/shared';
import { ResponsesTable } from '@/widgets';
import { useTranslation } from 'react-i18next';

export const ResponsesPage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'title',
  });
  return (
    <>
      <PageTitle title={t('responses')} />
      <Typography variant="h1">{t('responses')}</Typography>
      <ResponsesTable />
    </>
  );
};
