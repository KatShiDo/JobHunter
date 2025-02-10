import { DataTable } from '@/shared';
import { getColumns, ReportData } from './model/types.tsx';
import { getReports } from './api/get.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteReportModal } from '@/features';

export const ReportsTable = () => {
  const [data, setData] = useState<ReportData[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const { t } = useTranslation('translation', {
    keyPrefix: 'tables.reports',
  });

  useEffect(() => {
    const fetchData = async () => {
      const users = await getReports();
      setData(users);
    };
    fetchData();
  }, []);

  const handleDeleteClick = async (id: string) => {
    setSelectedReport(id);
    setIsDeleteModalOpen(true);
  };

  const updateResult = async (status: number) => {
    if (status !== 200) {
      return alert('Error');
    }
    const users = await getReports();
    setData(users);
  };

  return (
    <>
      <DeleteReportModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        reportId={selectedReport}
        onResult={updateResult}
      />
      <DataTable
        columns={getColumns(handleDeleteClick, t)}
        data={data}
      />
    </>
  );
};
