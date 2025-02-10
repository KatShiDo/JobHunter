import { Modal } from '@/shared/ui/Modal';
import { useCreateCompanyModal } from '../hooks/useEditModal';
import { useTranslation } from 'react-i18next';
import { createCompany } from '../api/post';
import { useAppSelector } from '@/app/model/store';

interface CreateCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResult: (status: number) => void;
}

export const CreateCompanyModal = ({ isOpen, onClose, onResult }: CreateCompanyModalProps) => {
  const user = useAppSelector(state => state.userReducer.user);

  const { inputs, formData } = useCreateCompanyModal();

  const { t } = useTranslation('translation', {
    keyPrefix: 'modals.profile.createCompany',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const status = await createCompany(user?._id as string, formData);
    onResult(status);
    onClose();
  };

  return (
    <Modal
      title={`${t('title')}`}
      inputs={inputs}
      isOpen={isOpen}
      onClose={onClose}
      submitText={t('button')}
      onSubmit={handleSubmit}
    />
  );
};
