import { Button, getFingerprint } from '@/shared';
import { VkIcon } from './assets/VkIcon';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export const VkAuthButton = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'userForms.alternativeAuth',
  });

  const [fingerprint, setFingerprint] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const fp = await getFingerprint();
      setFingerprint(fp);
    })();
  }, []);

  return (
    <Button
      variant="secondary"
      maxHeight="35px"
      onClick={() => {
        window.open(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/vkontakte?fingerprint=${fingerprint}`,
          '_blank'
        );
      }}
    >
      <VkIcon />
      {t('vk')}
    </Button>
  );
};
