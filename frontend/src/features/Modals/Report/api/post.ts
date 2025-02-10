import { api } from '@/shared';
import { ReportModalParams } from '../model/types';

export const reportVacancy = async (
  reasonUrl: string,
  formData: ReportModalParams
): Promise<number> => {
  const { status } = await api.post('/report/create', { ...formData, reasonUrl: reasonUrl });
  return status;
};
