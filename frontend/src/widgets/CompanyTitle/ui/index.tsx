import { Button, Typography } from '@/shared';
import { useTranslation } from 'react-i18next';
import { StyledCompanyTitle } from './styled';

interface CompanyTitleProps {
  onClick: () => void;
}

export const CompanyTitle = ({ onClick }: CompanyTitleProps) => {
  const { t } = useTranslation('translation');

  return (
    <StyledCompanyTitle>
      <Typography variant="h1">{t('title.company')}</Typography>
      <Button
        variant="primary"
        onClick={onClick}
        maxHeight="38px"
        maxWidth="200px"
      >
        {t('company.createVacancy')}
      </Button>
    </StyledCompanyTitle>
  );
};
