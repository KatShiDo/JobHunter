import { api } from '@/shared';
import { CreateCompanyModalParams } from '../model/types';

export const createCompany = async (
  id: string,
  formData: CreateCompanyModalParams
): Promise<number> => {
  const { status } = await api.post('/company/create', { ...formData, id: id });
  return status;
};
