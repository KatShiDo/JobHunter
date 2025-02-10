import { Modal } from '@/shared/ui/Modal';
import { useTranslation } from 'react-i18next';
import { disbandCompany } from '../api/post';

interface DisbandCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResult: (status: number) => void;
}

export const DisbandCompanyModal = ({ isOpen, onClose, onResult }: DisbandCompanyModalProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'modals.profile.disbandCompany',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const status = await disbandCompany();
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
