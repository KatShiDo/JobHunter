import { Modal } from '@/shared/ui/Modal';
import { useTranslation } from 'react-i18next';
import { deleteAccount } from '../api/post';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResult: (status: number) => void;
}

export const DeleteAccountModal = ({ isOpen, onClose, onResult }: DeleteAccountModalProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'modals.profile.deleteAccount',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const status = await deleteAccount();
    onResult(status);
    onClose();
  };

  return (
    <Modal
      title={t('title')}
      description={t('description')}
      isOpen={isOpen}
      onClose={onClose}
      submitText={t('button')}
      onSubmit={handleSubmit}
    />
  );
};
