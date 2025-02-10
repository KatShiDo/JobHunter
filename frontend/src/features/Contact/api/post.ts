import { api } from '@/shared';
import { ContactProps } from '../model/types';

export const SendContactForm = async (formData: ContactProps): Promise<number> => {
  const { status } = await api.post('/contact', formData);
  return status;
};
