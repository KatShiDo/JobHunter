import { Column } from 'react-table';
// import { useTranslation } from 'react-i18next';

export type DashboardData = {
  title: string;
  valueAll: string;
  valuePerMonth: string;
  recentEntries: string;
};

export const getColumns = (t: (key: string) => string): Column<DashboardData>[] => [
  { Header: t('title'), accessor: 'title' },
  { Header: t('valueAll'), accessor: 'valueAll' },
  { Header: t('valuePerMonth'), accessor: 'valuePerMonth' },
  { Header: t('recentEntries'), accessor: 'recentEntries' },
];
