import { api } from '@/shared';
import { EditVacancyModalParams } from '../model/types';

export const createVacancy = async (
  id: string,
  formData: EditVacancyModalParams
): Promise<number> => {
  const { status } = await api.post('/vacancy/edit', { ...formData, id: id });
  return status;
};
