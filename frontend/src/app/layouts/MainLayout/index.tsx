import { Navbar } from '@/widgets';
import { Outlet } from 'react-router-dom';
import { StyledMainLayout } from './styled';
import { PageTitle } from '@/shared';
import { useTranslation } from 'react-i18next';

export const MainLayout = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'title',
  });

  return (
    <>
      <PageTitle title={t('home')} />
      <StyledMainLayout>
        <Navbar />
        <Outlet />
      </StyledMainLayout>
    </>
  );
};
