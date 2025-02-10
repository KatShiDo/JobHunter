import { VacancyContent } from '@/widgets';
import { PageTitle } from '@/shared';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

export const VacancyPage = () => {
  const { id } = useParams();
  const { t } = useTranslation('translation', {
    keyPrefix: 'title',
  });
  return (
    <>
      <PageTitle title={t('vacancies')} />
      <VacancyContent id={id ?? ''} />
    </>
  );
};
