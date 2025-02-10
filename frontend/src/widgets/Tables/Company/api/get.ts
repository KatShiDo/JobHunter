import { api } from '@/shared';
import { CompanyData } from '../model/types';

export const getVacancies = async (): Promise<CompanyData[]> => {
  const response = await api.get('/vacancy/my');

  const companies: CompanyData[] = [];

  response.data.forEach((company: CompanyData) => {
    if (company && company._id) {
      companies.push({
        _id: company._id,
        title: company.title,
        description: company.description,
        hardSkills: company.hardSkills,
        leastSalary: company.leastSalary,
        highestSalary: company.highestSalary,
        responses: company.responses,
        lastUpdate: company.lastUpdate,
        actions: company._id,
      });
    }
  });

  return companies;
};
