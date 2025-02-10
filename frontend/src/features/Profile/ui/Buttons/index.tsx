import { Button } from '@/shared';
import { getUser } from '@/entities/user/model/slice';
import { ProfileButtonsContainer, StyledProfileButtons } from './styled';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '@/app/model/store';
import { useState } from 'react';
import { CreateCompanyModal } from '@/features/Modals/Profile/ui/CreateCompany';
import { DisbandCompanyModal } from '@/features/Modals/Profile/ui/DisbandCompany';
import { DeleteAccountModal } from '@/features/Modals/Profile/ui/DeleteAccount';
import { logout } from '@/features/UserForms';
import { useNavigate } from 'react-router-dom';

export const ProfileButtons = () => {
  const [isCreateCompanyModalOpen, setIsCreateCompanyModalOpen] = useState(false);
  const [isDisbandCompanyModalOpen, setIsDisbandCompanyModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);

  const { t } = useTranslation('translation', {
    keyPrefix: 'profile.buttons',
  });

  const navigate = useNavigate();
  const user = useAppSelector(state => state.userReducer.user);
  const dispatch = useAppDispatch();

  const handleCompanyButtonClick = () => {
    if (user?.company) {
      setIsDisbandCompanyModalOpen(true);
    } else {
      setIsCreateCompanyModalOpen(true);
    }
  };

  const refreshUserData = () => {
    dispatch(getUser());
  };

  const handleDeleteAccount = () => {
    dispatch(logout());
  };

  const companyButtonText = user?.company ? t('disbandCompany') : t('createCompany');

  return (
    <>
      <CreateCompanyModal
        isOpen={isCreateCompanyModalOpen}
        onClose={() => setIsCreateCompanyModalOpen(false)}
        onResult={() => refreshUserData()}
      />

      <DisbandCompanyModal
        isOpen={isDisbandCompanyModalOpen}
        onClose={() => setIsDisbandCompanyModalOpen(false)}
        onResult={() => refreshUserData()}
      />

      <DeleteAccountModal
        isOpen={isDeleteAccountModalOpen}
        onClose={() => setIsDeleteAccountModalOpen(false)}
        onResult={() => handleDeleteAccount()}
      />

      <ProfileButtonsContainer>
        {!user?.ban?.expiresAt ? (
          <StyledProfileButtons>
            <Button
              variant={'primary'}
              maxHeight="37px"
              onClick={handleCompanyButtonClick}
            >
              {companyButtonText}
            </Button>
          </StyledProfileButtons>
        ) : null}
        <StyledProfileButtons>
          <Button
            variant={'primary'}
            maxHeight="37px"
            onClick={() => navigate('/email-verification?type=forgotPassword')}
          >
            {t('setPassword')}
          </Button>
          <Button
            variant={'primary'}
            maxHeight="37px"
            onClick={() => setIsDeleteAccountModalOpen(true)}
          >
            {t('deleteAccount')}
          </Button>
        </StyledProfileButtons>
      </ProfileButtonsContainer>
    </>
  );
};
