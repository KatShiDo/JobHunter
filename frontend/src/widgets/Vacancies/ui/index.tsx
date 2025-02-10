import { useEffect, useState } from 'react';
import { getVacancies } from '../api/get';
import { VacancyListData } from '../model/types';
import { StyledVacanciesList, Vacancy } from './styled';
import { Typography } from '@/shared';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/app/model/store';
import { useTranslation } from 'react-i18next';

export const VacanciesList = () => {
  const [data, setData] = useState<VacancyListData[]>([]);
  const query = useAppSelector(state => state.commonReducer.searchQuery);
  const navigate = useNavigate();

  const { t } = useTranslation('translation', {
    keyPrefix: 'vacancies',
  });

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const vacancies = await getVacancies(query);
        setData(vacancies);
      } catch (error) {
        console.error('Error fetching vacancies:', error);
      }
    };

    fetchVacancies();
  }, [query]);

  const openVacancy = (id: string) => {
    navigate(`/vacancy/${id}`);
  };

  return (
    <StyledVacanciesList>
      {data.length > 0 ? (
        data.map((vacancy, index) => (
          <Vacancy
            key={index}
            onClick={() => openVacancy(vacancy._id)}
            role="button"
          >
            <Typography variant="body1">{vacancy.title}</Typography>
            <Typography variant="body4">
              {vacancy.leastSalary} - {vacancy.highestSalary}
            </Typography>
          </Vacancy>
        ))
      ) : (
        <Typography variant="body2">{t('notFound')}</Typography>
      )}
    </StyledVacanciesList>
  );
};
