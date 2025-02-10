import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReportModalParams } from '../model/types';

export const useReportModal = () => {
  const [formData, setFormData] = useState<ReportModalParams>({
    reason: '',
  });

  const { t } = useTranslation('translation', {
    keyPrefix: 'modals.report.inputs',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const inputs = [
    {
      value: formData.reason,
      type: 'text',
      name: 'reason',
      onChange: handleChange,
      placeholder: t('reason'),
    },
  ];

  return { inputs, formData };
};
