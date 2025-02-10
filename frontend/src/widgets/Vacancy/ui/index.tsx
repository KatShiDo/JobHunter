import { Button, ReportButton, SanitizeHtmlViewer, Typography } from '@/shared';
import {
  DescriptionText,
  StyledVacancy,
  VacancyCompanyInfo,
  VacancyDescription,
  VacancyInfo,
  VacancyInfoContainer,
  VacancyMap,
} from './styled';
import { useEffect, useState } from 'react';
import { getVacancy } from '../api/get';
import { VacancyData } from '../model/types';
import { useTranslation } from 'react-i18next';
import { BanUserModal, DeleteVacancyModal, ReplyVacancyModal } from '@/features';
import { useAppSelector } from '@/app/model/store';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useTheme } from '@emotion/react';

interface VacancyProps {
  id: string;
}

export const VacancyContent = ({ id }: VacancyProps) => {
  const [data, setData] = useState<VacancyData | null>(null);
  const [modalState, setModalState] = useState({ reply: false, delete: false, ban: false });
  const navigate = useNavigate();
  const user = useAppSelector(state => state.userReducer.user);
  const { t } = useTranslation('translation', { keyPrefix: 'vacancy' });
  const theme = useTheme()

  useEffect(() => {
    getVacancy(id).then(setData);
  }, [id]);

  const handleAction = (type: keyof typeof modalState) => {
    if (!user) return navigate('/sign-in');
    setModalState(prev => ({ ...prev, [type]: true }));
  };

  const onReplyResult = (status: number, type?: string) => {
    if (status !== 200) return alert('Error');
    navigate(type === 'admin' ? '/vacancies' : '/responses');
  };

  if (!data) return null;

  return (
    <StyledVacancy>
      <ReplyVacancyModal isOpen={modalState.reply} onClose={() => setModalState(prev => ({ ...prev, reply: false }))} onResult={onReplyResult} id={id} />
      <BanUserModal isOpen={modalState.ban} onClose={() => setModalState(prev => ({ ...prev, ban: false }))} user={data.user} onResult={status => onReplyResult(status, 'admin')} />
      <DeleteVacancyModal isOpen={modalState.delete} onClose={() => setModalState(prev => ({ ...prev, delete: false }))} vacancy={{ _id: id }} onResult={status => onReplyResult(status, 'admin')} />
      <VacancyInfoContainer>
        <VacancyInfo>
          <Typography variant="h1">{data.title}</Typography>
          <Typography variant="body1">{data.leastSalary} - {data.highestSalary}</Typography>
          <Typography variant="body3"><b>{t('hardSkills')}:</b> {data.hardSkills}</Typography>
          {user && user.confirmed && !user.ban?.expiresAt && user.role !== 'admin' && user.role !== 'employer' && (
            <Button variant="primary" maxHeight="42px" maxWidth="350px" onClick={() => handleAction('reply')}>
              <Typography variant="body3">{t('buttons.reply')}</Typography>
            </Button>
          )}
          {user?.role === 'admin' && (
            <>
              <Button variant="primary" maxHeight="42px" maxWidth="350px" onClick={() => handleAction('delete')}>
                <Typography variant="body3">{t('buttons.delete')}</Typography>
              </Button>
              <Button variant="primary" maxHeight="42px" maxWidth="350px" onClick={() => handleAction('ban')}>
                <Typography variant="body3">{t('buttons.ban')}</Typography>
              </Button>
            </>
          )}
          {user?.role !== 'admin' && <ReportButton maxWidth="350px" maxHeight="42px" />}
        </VacancyInfo>
        <VacancyDescription>
          <Typography variant="h3">{t('description')}</Typography>
          <DescriptionText>
            <SanitizeHtmlViewer content={data.description} color={theme.primary.contrastText}/>
          </DescriptionText>
        </VacancyDescription>
        <Typography variant="body4">{t('createdAt')} {data.created ? format(new Date(data.created), 'yyyy.MM.dd') : ''}</Typography>
      </VacancyInfoContainer>
      <VacancyCompanyInfo>
        <Typography variant="h3">{t('companyInfo')}</Typography>
        <Typography variant="body3"><b>{t('company.name')}:</b> {data.company?.name}</Typography>
        <Typography variant="body3"><b>{t('company.address')}:</b> {data.company?.address}</Typography>
        <Typography variant="body3"><b>{t('company.email')}:</b> {data.user?.email}</Typography>
        <VacancyMap src={`https://yandex.ru/map-widget/v1/?mode=search&text=${data.company?.address}`} />
      </VacancyCompanyInfo>
    </StyledVacancy>
  );
};