import { Modal } from '@/shared/ui/Modal';
import { useCreateVacancyModal } from '../hooks/useEditModal';
import { useTranslation } from 'react-i18next';
import { createVacancy } from '../api/post';
import { useAppSelector } from '@/app/model/store';

interface CreateVacancyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResult: (status: number) => void;
}

export const CreateVacancyModal = ({ isOpen, onClose, onResult }: CreateVacancyModalProps) => {
  const user = useAppSelector(state => state.userReducer.user);

  const { inputs, editors, formData, setFormData } = useCreateVacancyModal();

  const { t } = useTranslation('translation', {
    keyPrefix: 'modals.company.createVacancy',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const status = await createVacancy(user?._id as string, formData);
    onResult(status);
    onClose();
    setFormData({
      title: '',
      leastSalary: '',
      highestSalary: '',
      hardSkills: '',
      description: ''
    })
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
