import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@emotion/react';
import { StyledProfileAvatar } from './styled';
import { Popup, UserImage } from '@/shared';
import { getCurrentAvatar } from './api/get';
import { uploadAvatar } from './api/post';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';

export const ProfileAvatar = () => {
  const theme = useTheme();
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { t } = useTranslation('translation', {
    keyPrefix: 'profile',
  });

  useEffect(() => {
    getCurrentAvatar()
      .then((response: AxiosResponse<{ avatar: string }>) => {
        setAvatarUrl(response.data.avatar);
      })
      .catch(() => {
        setPopupMessage(t('popup.errorGetAvatar'));
        setOpenPopup(true);
      });
  }, [t]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = event.target.files ? event.target.files[0] : null;
    if (file) {
      try {
        const response = (await uploadAvatar(file)) as AxiosResponse<{ avatar: string }>;
        setAvatarUrl(response.data.avatar);
      } catch {
        setPopupMessage(t('popup.errorUploadAvatar'));
        setOpenPopup(true);
      }
    }
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <Popup
        isOpen={isOpenPopup}
        onClose={() => setOpenPopup(false)}
        onSubmit={() => setOpenPopup(false)}
        description={popupMessage || t('popup.default')}
        submitText={t('popup.button')}
      />
      <StyledProfileAvatar
        onClick={() => handleAvatarClick()}
        style={{ cursor: 'pointer' }}
      >
        {avatarUrl ? (
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${avatarUrl}`}
            alt="User Avatar"
          />
        ) : (
          <UserImage fill={theme.primary.black} />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
      </StyledProfileAvatar>
    </>
  );
};
