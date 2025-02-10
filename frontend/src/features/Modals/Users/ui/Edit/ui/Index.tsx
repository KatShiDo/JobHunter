import { Modal } from '@/shared/ui/Modal';
import { useEditModal } from '../hooks/useEditModal';
import { useTranslation } from 'react-i18next';
import { UserData } from '@/widgets/Tables/Users/model/types';
import { EditModalParams } from '../model/types';
import { editUser } from '../api/post';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserData | null;
  onResult: (status: number) => void;
}

export const EditUserModal = ({ isOpen, onClose, user, onResult }: EditModalProps) => {
  const { inputs, formData } = useEditModal(user as EditModalParams);

  const { t } = useTranslation('translation', {
    keyPrefix: 'modals.users.edit',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const status = await editUser(user?._id as string, formData);
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
