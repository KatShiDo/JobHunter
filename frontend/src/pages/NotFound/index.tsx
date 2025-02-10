import { Typography } from '@/shared';
import { useTranslation } from 'react-i18next';

export const NotFoundPage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'title',
  });
  return (
    <>
      <Typography variant="h1">{t('notfound')}</Typography>
    </>
  );
};
