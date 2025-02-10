import { api } from '@/shared';
import { ReportData } from '../model/types';

interface ReportParams {
  _id: string;
  user: string;
  reasonUrl: string;
  reason: string;
  actions: string;
}

export const getReports = async (): Promise<ReportData[]> => {
  const response = await api.get('/admin/report');

  const reports: ReportData[] = [];

  response.data.forEach((report: ReportParams) => {
    reports.push({
      _id: report._id,
      reasonUrl: report.reasonUrl,
      reason: report.reason,
      senderId: report.user,
      actions: report._id,
    });
  });

  return reports;
};
