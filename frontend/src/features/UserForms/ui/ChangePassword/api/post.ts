import { api } from '@/shared';

export const changePassword = async (token: string, password: string) => {
  const { status } = await api.post('auth/change', { token: token, password: password });
  return status;
};
