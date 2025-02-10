import { PageTitle } from '@/shared';
import { useTranslation } from 'react-i18next';
import { ContactForm } from '@/features';

export const ContactPage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'title',
  });

  return (
    <>
      <PageTitle title={t('Contact')} />
      <ContactForm />
    </>
  );
};
