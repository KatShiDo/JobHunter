import { api } from '@/shared';

export const deleteVacancy = async (id: string): Promise<number> => {
  const { status } = await api.post('/vacancy/delete', { id: id });
  return status;
};
