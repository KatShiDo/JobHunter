import { api } from '@/shared';
import { VacancyData } from '../model/types';

export const getVacancy = async (id: string): Promise<VacancyData> => {
  const { data } = await api.get(`/vacancy/id/${id}`);
  return data;
};
