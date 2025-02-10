import { useAppSelector } from '@/app/model/store';
import { ReportModal } from '@/features';
import { Button, Typography } from '@/shared';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ReportIcon from '../assets/report.svg';
import { ReportText } from './styled';

interface ReportButtonProps {
  maxWidth: string;
  maxHeight: string;
}

export const ReportButton = ({ maxWidth, maxHeight }: ReportButtonProps) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const { t } = useTranslation('translation', {
    keyPrefix: 'modals.report',
  });

  const user = useAppSelector(state => state.userReducer.user);

  const navigate = useNavigate();
  const handleReport = () => {
    if (user === null) {
      navigate('/sign-in');
      return;
    }
    setIsReportModalOpen(true);
  };

  return (
    <>
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        reasonUrl={`${window.location.href}`}
      />
      <Button
        variant="secondary"
        maxHeight={maxHeight}
        maxWidth={maxWidth}
        onClick={() => handleReport()}
      >
        <img
          src={ReportIcon}
          alt="report"
        />
        <ReportText>
          <Typography variant="body3">
            <ReportText>{t('title')} </ReportText>
          </Typography>
        </ReportText>
      </Button>
    </>
  );
};
