import { api } from '@/shared';
import { ReponsesData } from '../model/types';

interface ResponseParams {
  _id: string;
  vacancy: {
    title: string;
    _id: string;
  };
  user: {
    _id: string;
    email: string;
  };
  description: string;
  skills: string;
  created: string;
  actions: string;
}

export const getResponse = async (): Promise<ReponsesData[]> => {
  const response = await api.get('/response');

  const companies: ReponsesData[] = [];

  response.data.forEach((response: ResponseParams) => {
    if (response && response.vacancy._id) {
      companies.push({
        _id: response._id,
        vacancyId: response.vacancy._id,
        vacancyTitle: response.vacancy.title,
        description: response.description,
        userId: response.user._id,
        email: response.user.email,
        skills: response.skills,
        created: response.created,
        actions: response.vacancy._id,
      });
    }
  });

  return companies;
};
