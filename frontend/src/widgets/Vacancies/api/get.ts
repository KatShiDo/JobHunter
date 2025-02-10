import { api } from '@/shared';
import { VacancyListData } from '../model/types';

export const getVacancies = async (query: string): Promise<VacancyListData[]> => {
  const { data } = await api.get(`/vacancy?query=${query}`);
  return data;
};
