import { Modal } from '@/shared/ui/Modal';
import { useCreateVacancyModal } from '../hooks/useEditModal';
import { useTranslation } from 'react-i18next';
import { createVacancy } from '../api/post';
import { EditVacancyModalParams } from '../model/types';

interface EditVacancyModalProps {
  isOpen: boolean;
  onClose: () => void;
  vacancy: EditVacancyModalParams | null;
  onResult: (status: number) => void;
}

export const EditVacancyModal = ({ isOpen, onClose, onResult, vacancy }: EditVacancyModalProps) => {
  const { inputs, editors, formData } = useCreateVacancyModal(vacancy as EditVacancyModalParams);

  const { t } = useTranslation('translation', {
    keyPrefix: 'modals.company.editVacancy',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const status = await createVacancy(vacancy?._id ?? '', formData);
    onResult(status);
    onClose();
  };

  return (
    <Modal
      title={`${t('title')}`}
      inputs={inputs}
      editors={editors}
      isOpen={isOpen}
      onClose={onClose}
      submitText={t('button')}
      onSubmit={handleSubmit}
    />
  );
};
