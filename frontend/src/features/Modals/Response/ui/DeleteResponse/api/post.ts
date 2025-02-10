import { api } from '@/shared';

export const deleteResponse = async (id: string): Promise<number> => {
  const { status } = await api.post('/response/delete', { id: id });
  return status;
};
