import { api } from '@/shared';

export const deleteAccount = async () => {
  const { status } = await api.post('/user/delete');
  return status;
};
