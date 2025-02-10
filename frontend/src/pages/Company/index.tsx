import { PageTitle } from '@/shared';
import { CompanyTable } from '@/widgets/Tables';
import { useTranslation } from 'react-i18next';

export const CompanyPage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'title',
  });

  return (
    <>
      <PageTitle title={t('company')} />
      <CompanyTable />
    </>
  );
};
