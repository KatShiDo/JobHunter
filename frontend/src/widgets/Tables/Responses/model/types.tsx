import { Dropdown } from '@/shared/ui/Dropdown';
import { DropdownDeleteIcon, DropdownLinkIcon } from '@/shared';
import { ExtendedColumn } from '@/shared';
import { useNavigate } from 'react-router-dom';

export type ReponsesData = {
  _id: string;
  vacancyId: string;
  vacancyTitle?: string;
  userId?: string;
  email?: string;
  description?: string;
  skills: string;
  created: string;
  actions: string;
};

export const getColumns = (
  handleDeleteClick: (response: ReponsesData) => void,
  userRole: string,
  t: (key: string) => string
): ExtendedColumn<ReponsesData>[] => {
  const userColumns: ExtendedColumn<ReponsesData>[] = [
    { Header: t('tables.response.title'), accessor: 'vacancyTitle' },
    { Header: t('tables.response.description'), accessor: 'description' },
    { Header: t('tables.response.skills'), accessor: 'skills' },
    { Header: t('tables.response.created'), accessor: 'created' },
    {
      Header: t('tables.response.actions'),
      accessor: 'actions',
      overflow: 'visible',
      Cell: ({ row }: { row: { original: ReponsesData } }) => {
        const navigate = useNavigate();
        const dropdownItems = [
          {
            icon: <DropdownLinkIcon />,
            text: t('dropdown.openVacancy'),
            onClick: () => {
              navigate(`/vacancy/${row.original.vacancyId}`);
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

  const employerColumns: ExtendedColumn<ReponsesData>[] = [
    { Header: t('tables.response.title'), accessor: 'vacancyTitle' },
    { Header: t('tables.response.email'), accessor: 'email' },
    { Header: t('tables.response.description'), accessor: 'description' },
    { Header: t('tables.response.skills'), accessor: 'skills' },
    { Header: t('tables.response.created'), accessor: 'created' },
    {
      Header: 'Actions',
      accessor: 'actions',
      overflow: 'visible',
      Cell: ({ row }: { row: { original: ReponsesData } }) => {
        const navigate = useNavigate();
        const dropdownItems = [
          {
            icon: <DropdownLinkIcon />,
            text: t('dropdown.openVacancy'),
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
  if (userRole === 'user') {
    return userColumns;
  } else if (userRole === 'employer') {
    return employerColumns;
  }

  return [];
};
