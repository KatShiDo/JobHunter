import { PageTitle, Typography } from '@/shared';
import { VacanciesList } from '@/widgets/Vacancies';
import { useTranslation } from 'react-i18next';

export const VacanciesPage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'title',
  });
  return (
    <>
      <PageTitle title={t('vacancies')} />
      <Typography variant="h1">{t('vacancies')}</Typography>
      <VacanciesList />
    </>
  );
};
