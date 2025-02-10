import { api } from '@/shared';
import { BanModalParams } from '../model/types';

export const banUser = async (id: string, formData: BanModalParams): Promise<number> => {
  const { status } = await api.post('admin/user/ban', { ...formData, id: id });
  return status;
};
