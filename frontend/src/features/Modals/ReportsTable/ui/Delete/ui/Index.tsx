import { Modal } from '@/shared/ui/Modal';
import { useTranslation } from 'react-i18next';
import { deleteReport } from '../api/post';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportId: string | null;
  onResult: (status: number) => void;
}

export const DeleteReportModal = ({ isOpen, onClose, reportId, onResult }: DeleteModalProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'modals.report.delete',
  });

  if (reportId === null) {
    return;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const status = await deleteReport(reportId);
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
