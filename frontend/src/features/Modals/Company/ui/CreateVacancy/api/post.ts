import { api } from '@/shared';
import { CreateVacancyModalParams } from '../model/types';

export const createVacancy = async (
  id: string,
  formData: CreateVacancyModalParams
): Promise<number> => {
  const { status } = await api.post('/vacancy/create', { ...formData, id: id });
  return status;
};
