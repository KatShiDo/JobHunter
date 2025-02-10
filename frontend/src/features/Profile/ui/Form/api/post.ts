import { api } from '@/shared';
import { ProfileParams } from '../model/types';

export const EditUser = async (formData: ProfileParams): Promise<number> => {
  const { status } = await api.post('/user/edit', { ...formData });
  return status;
};
