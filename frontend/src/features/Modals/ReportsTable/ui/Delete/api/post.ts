import { api } from '@/shared';

export const deleteReport = async (id: string): Promise<number> => {
  const { status } = await api.post('admin/report/delete', { id: id });
  return status;
};
