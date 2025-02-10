import { api } from '@/shared';

export const getCurrentAvatar = async () => {
  const response = await api.get('user/avatar');

  return response;
};
