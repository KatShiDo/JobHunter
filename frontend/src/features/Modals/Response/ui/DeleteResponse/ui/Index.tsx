import { Modal } from '@/shared/ui/Modal';
import { useTranslation } from 'react-i18next';
import { deleteResponse } from '../api/post';

interface DeleteResponseProps {
  isOpen: boolean;
  onClose: () => void;
  response: {
    _id: string;
  };
  onResult: (status: number) => void;
}

export const DeleteResponseModal = ({
  isOpen,
  onClose,
  response,
  onResult,
}: DeleteResponseProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'modals.response.delete',
  });

  if (response === null) {
    return;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const status = await deleteResponse(response._id);
    onResult(status);
    onClose();
  };

  return (
    <Modal
      title={`${t('title')}`}
      description={t('description')}
      isOpen={isOpen}
      onClose={onClose}
      submitText={t('button')}
      onSubmit={handleSubmit}
    />
  );
};
