import { Modal } from '@/shared/ui/Modal';
import { useReplyVacancyModal } from '../hooks/useReplyVacancyModal';
import { useTranslation } from 'react-i18next';
import { replyVacancy } from '../api/post';

interface ReplyVacancyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResult: (status: number) => void;
  id: string;
}

export const ReplyVacancyModal = ({ isOpen, onClose, onResult, id }: ReplyVacancyModalProps) => {
  const { inputs, formData } = useReplyVacancyModal();

  const { t } = useTranslation('translation', {
    keyPrefix: 'modals.vacancy.reply',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const status = await replyVacancy(id as string, formData);
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
