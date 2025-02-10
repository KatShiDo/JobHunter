import { Modal } from '@/shared/ui/Modal';
import { useBanModal } from '../hooks/useBanModal';
import { useTranslation } from 'react-i18next';
import { banUser } from '../api/post';
import { UserData } from '@/widgets/Tables/Users/model/types';

interface BanModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserData | null;
  onResult: (status: number) => void;
}

export const BanUserModal = ({ isOpen, onClose, user, onResult }: BanModalProps) => {
  const { inputs, formData } = useBanModal();

  const { t } = useTranslation('translation', {
    keyPrefix: 'modals.users.ban',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const status = await banUser(user?._id as string, formData);
    onResult(status);
    onClose();
  };

  return (
    <Modal
      title={`${t('title')} ${user && user.email}`}
      inputs={inputs}
      isOpen={isOpen}
      onClose={onClose}
      submitText={t('button')}
      onSubmit={handleSubmit}
    />
  );
};
