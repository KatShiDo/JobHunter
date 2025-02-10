import { Modal } from '@/shared/ui/Modal';
import { useReportModal } from '../hooks/useReportModal';
import { useTranslation } from 'react-i18next';
import { reportVacancy } from '../api/post';
import { Popup } from '@/shared';
import { useState } from 'react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reasonUrl: string;
}

export const ReportModal = ({ isOpen, onClose, reasonUrl }: ReportModalProps) => {
  const { inputs, formData } = useReportModal();
  const { t } = useTranslation('translation', { keyPrefix: 'modals.report' });

  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const status = await reportVacancy(reasonUrl, formData);
      if (status === 200) {
        setMessage(t('popup.success'));
      } else {
        setMessage(t('popup.error'));
      }
    } catch {
      setMessage(t('popup.error'));
    }
  };

  const handleClose = () => {
    onClose();
    setMessage(null);
  };

  return (
    <>
      <Modal
        title={t('title')}
        inputs={inputs}
        isOpen={isOpen}
        onClose={onClose}
        submitText={t('button')}
        onSubmit={handleSubmit}
      />
      {message && (
        <Popup
          title={message}
          isOpen={message != ''}
          onClose={() => handleClose()}
          onSubmit={() => handleClose()}
          submitText={t('popup.button')}
        />
      )}
    </>
  );
};
