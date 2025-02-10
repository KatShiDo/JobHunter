import { api } from '@/shared';
import { EditModalParams } from '../model/types';

export const editUser = async (id: string, formData: EditModalParams): Promise<number> => {
  const { status } = await api.post('admin/user/edit', { ...formData, id: id });
  return status;
};
