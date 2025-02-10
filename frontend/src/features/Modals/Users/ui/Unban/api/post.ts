import { api } from '@/shared';

export const deleteUser = async (id: string): Promise<number> => {
  const { status } = await api.post('admin/user/unban', { id: id });
  return status;
};
