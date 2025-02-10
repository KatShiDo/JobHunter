import { PageTitle, Typography } from '@/shared';
import { Profile } from '@/widgets';
import { useTranslation } from 'react-i18next';

export const ProfilePage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'title',
  });
  return (
    <>
      <PageTitle title={t('profile')} />
      <Typography variant="h1">{t('profile')}</Typography>
      <Profile />
    </>
  );
};
