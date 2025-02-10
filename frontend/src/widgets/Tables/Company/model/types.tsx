import { Dropdown } from '@/shared/ui/Dropdown';
import { DropdownDeleteIcon, DropdownEditIcon, DropdownLinkIcon } from '@/shared';
import { ExtendedColumn } from '@/shared';
import { useNavigate } from 'react-router-dom';

export type CompanyData = {
  _id: string;
  title: string;
  description: string;
  hardSkills: string;
  leastSalary: string;
  highestSalary: string;
  responses: string;
  lastUpdate: string;
  actions: string;
};

export const getColumns = (
  handleEditClick: (vacancy: CompanyData) => void,
  handleDeleteClick: (vacancy: CompanyData) => void,
  t: (key: string) => string
): ExtendedColumn<CompanyData>[] => [
  { Header: t('tables.company.title'), accessor: 'title', maxWidth: 200 },
  { Header: t('tables.company.description'), accessor: 'description', maxWidth: 200 },
  { Header: t('tables.company.hardSkills'), accessor: 'hardSkills', maxWidth: 200 },
  { Header: t('tables.company.leastSalary'), accessor: 'leastSalary', maxWidth: 120 },
  { Header: t('tables.company.leastHighest'), accessor: 'highestSalary', maxWidth: 120 },
  { Header: t('tables.company.responses'), accessor: 'responses', maxWidth: 100 },
  { Header: t('tables.company.lastUpdate'), accessor: 'lastUpdate' },
  {
    Header: t('tables.company.actions'),
    accessor: 'actions',
    overflow: 'visible',
    Cell: ({ row }: { row: { original: CompanyData } }) => {
      const navigate = useNavigate();
      const dropdownItems = [
        {
          icon: <DropdownEditIcon />,
          text: t('dropdown.edit'),
          onClick: () => {
            handleEditClick(row.original);
          },
        },
        {
          icon: <DropdownLinkIcon />,
          text: t('dropdown.open'),
          onClick: () => {
            navigate(`/vacancy/${row.original._id}`);
          },
        },
        {
          icon: <DropdownDeleteIcon />,
          text: t('dropdown.delete'),
          color: '#B73535',
          onClick: () => {
            handleDeleteClick(row.original);
          },
        },
      ];
      return <Dropdown items={dropdownItems} />;
    },
  },
];
