import {
  ProfileFormButtons,
  ProfileFormContainer,
  ProfileFormInput,
  ProfileFormInputBox,
  StyledProfileForm,
} from './styled';
import { useProfileForm } from './hooks/useProfileForm';
import { Button, Popup, Typography } from '@/shared';
import { useTranslation } from 'react-i18next';
import { EditUser } from './api/post';
import { getUser } from '@/entities';
import { useAppDispatch, useAppSelector } from '@/app/model/store';
import { ProfileParams } from './model/types';
import { useState } from 'react';

export const ProfileForm = () => {
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const { inputs, formData, validate, initialValues, resetFormData } = useProfileForm();
  const user = useAppSelector(state => state.userReducer.user);

  const { t } = useTranslation('translation', {
    keyPrefix: 'profile',
  });
  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setPopupMessage(t('popup.default'));
      return setOpenPopup(true);
    }

    const isEmailChanged = formData.email !== initialValues.email;
    if (formData === initialValues) {
      return;
    }

    const status = await EditUser(formData);

    if (status != 200) {
      setPopupMessage(t('popup.default'));
      return setOpenPopup(true);
    }

    if (isEmailChanged) {
      setPopupMessage(t('popup.changeEmail'));
      return setOpenPopup(true);
    }

    resetProfile();
  };

  const resetProfile = async () => {
    setOpenPopup(false);
    dispatch(getUser());
    resetFormData();
  };

  return (
    <ProfileFormContainer>
      <Popup
        isOpen={isOpenPopup}
        onClose={() => setOpenPopup(false)}
        onSubmit={() => resetProfile()}
        description={popupMessage || t('popup.default')}
        submitText={t('popup.button')}
      />
      <Typography variant={'h4'}>{t('title')}</Typography>
      <StyledProfileForm onSubmit={onSubmit}>
        {inputs.map((item, index) => (
          <ProfileFormInputBox key={index}>
            <ProfileFormInput
              required
              value={item.value}
              type={item.type}
              name={item.name}
              placeholder={item.placeholder}
              onChange={item.onChange}
              $changed={initialValues[item.name as keyof ProfileParams] !== item.value}
            />
          </ProfileFormInputBox>
        ))}
        <ProfileFormButtons>
          {
            !user?.ban?.expiresAt ? (
              <Button
                variant={'primary'}
                maxHeight="40px"
                maxWidth="97px"
              >
                {t('save')}
              </Button>
            ) : null
          }
        </ProfileFormButtons>
      </StyledProfileForm>
    </ProfileFormContainer>
  );
};
