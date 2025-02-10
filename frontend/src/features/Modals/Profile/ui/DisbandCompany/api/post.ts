import { api } from '@/shared';

export const disbandCompany = async () => {
  const { status } = await api.post('/company/disband');
  return status;
};
