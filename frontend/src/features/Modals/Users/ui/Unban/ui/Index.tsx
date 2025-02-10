import { Modal } from '@/shared/ui/Modal';
import { useTranslation } from 'react-i18next';
import { UserData } from '@/widgets/Tables/Users/model/types';
import { deleteUser } from '../api/post';

interface UnbanModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserData | null;
  onResult: (status: number) => void;
}

export const UnbanUserModal = ({ isOpen, onClose, user, onResult }: UnbanModalProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'modals.users.unban',
  });

  if (user === null) {
    return;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const status = await deleteUser(user._id);
    onResult(status);
    onClose();
  };

  return (
    <Modal
      title={`${t('title')} ${user && user.email}`}
      description={t('description')}
      isOpen={isOpen}
      onClose={onClose}
      submitText={t('button')}
      onSubmit={handleSubmit}
    />
  );
};
