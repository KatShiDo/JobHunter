import { Button, getFingerprint } from '@/shared';
import { YandexIcon } from './assets/YandexIcon';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export const YandexAuthButton = () => {
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
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/yandex?fingerprint=${fingerprint}`,
          '_blank'
        );
      }}
    >
      <YandexIcon />
      {t('yandex')}
    </Button>
  );
};
