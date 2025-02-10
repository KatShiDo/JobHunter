import { api } from '@/shared';
import { DashboardData } from '../model/types';

export const getInfo = async (t: (key: string) => string): Promise<DashboardData[]> => {
  const response = await api.get('/admin/info');

  const data: DashboardData[] = [
    {
      title: t('users'),
      valueAll: response.data.allUsers,
      valuePerMonth: response.data.perMounthUsers,
      recentEntries: 'Recent Entries',
    },
    {
      title: t('vacancies'),
      valueAll: response.data.allVacancy,
      valuePerMonth: response.data.perMounthVacancy,
      recentEntries: 'Recent Entries',
    },
    {
      title: t('companies'),
      valueAll: response.data.allCompany,
      valuePerMonth: response.data.perMounthCompany,
      recentEntries: 'Recent Entries',
    },
  ];

  return data;
};
