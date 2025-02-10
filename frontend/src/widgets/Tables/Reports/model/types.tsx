import { Dropdown } from '@/shared/ui/Dropdown';
import { useTranslation } from 'react-i18next';
import { DropdownDeleteIcon, ExtendedColumn } from '@/shared';
import { Link } from 'react-router-dom';

export type ReportData = {
  _id: string;
  senderId: string;
  reasonUrl: string;
  reason: string;
  actions: string;
};

export const getColumns = (
  handleDeleteClick: (id: string) => void,
  t: (key: string) => string
): ExtendedColumn<ReportData>[] => [
  { Header: t('senderId'), accessor: 'senderId' },
  {
    Header: t('reasonUrl'),
    accessor: 'reasonUrl',
    Cell: ({ value }: { value: string }) => {
      return <Link to={value}>{value}</Link>;
    },
  },
  { Header: t('reason'), accessor: 'reason' },
  {
    Header: t('actions'),
    accessor: 'actions',
    overflow: 'visible',
    Cell: ({ row }: { row: { original: ReportData } }) => {
      const { t } = useTranslation('translation', { keyPrefix: 'dropdown' });

      const dropdownItems = [
        {
          icon: <DropdownDeleteIcon />,
          text: t('delete'),
          color: '#B73535',
          onClick: () => {
            handleDeleteClick(row.original._id);
          },
        },
      ];

      return <Dropdown items={dropdownItems} />;
    },
  },
];
