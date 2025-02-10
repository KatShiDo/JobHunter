import { api } from '@/shared';
import { ReplyVacancyModalParams } from '../model/types';

export const replyVacancy = async (
  id: string,
  formData: ReplyVacancyModalParams
): Promise<number> => {
  const { status } = await api.post('/response/create', { ...formData, id: id });
  return status;
};
