import { DataTable } from '@/shared';
import { getColumns, DashboardData } from './model/types.tsx';
import { getInfo } from './api/get.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const DashboardTable = () => {
  const [data, setData] = useState<DashboardData[]>([]);

  const { t } = useTranslation('translation', {
    keyPrefix: 'tables.dashboard',
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInfo(t);
      setData(data);
    };
    fetchData();
  }, [t]);

  return (
    <>
      <DataTable
        columns={getColumns(t)}
        data={data}
      />
    </>
  );
};
