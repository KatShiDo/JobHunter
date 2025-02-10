import { Modal } from '@/shared/ui/Modal';
import { useTranslation } from 'react-i18next';
import { deleteVacancy } from '../api/post';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  vacancy: {
    _id: string;
  };
  onResult: (status: number) => void;
}

export const DeleteVacancyModal = ({ isOpen, onClose, vacancy, onResult }: DeleteModalProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'modals.company.deleteVacancy',
  });

  if (vacancy === null) {
    return;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const status = await deleteVacancy(vacancy._id);
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
