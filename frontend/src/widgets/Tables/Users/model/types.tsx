import { Dropdown } from '@/shared/ui/Dropdown';
import { useTranslation } from 'react-i18next';
import { DropdownBanIcon, DropdownDeleteIcon, DropdownEditIcon, ExtendedColumn } from '@/shared';

export type UserData = {
  _id: string;
  middlename: string;
  username: string;
  email: string;
  avatar: string;
  role: string;
  ban: string;
  actions: string;
};

export const getColumns = (
  handleEditClick: (user: UserData) => void,
  handleDeleteClick: (user: UserData) => void,
  handleBanClick: (user: UserData) => void,
  handleUnbanClick: (user: UserData) => void,
  t: (key: string) => string
): ExtendedColumn<UserData>[] => [
  { Header: 'Id', accessor: '_id' },
  { Header: t('middlename'), accessor: 'middlename' },
  { Header: t('username'), accessor: 'username' },
  { Header: t('email'), accessor: 'email' },
  {
    Header: t('avatar'),
    accessor: 'avatar',
    Cell: ({ value }: { value: string }) => (
      <img
        src={value}
        alt="avatar"
        width="40px"
        height="40px"
        style={{ objectFit: 'cover', borderRadius: '50%' }}
      />
    ),
  },
  { Header: t('role'), accessor: 'role' },
  { Header: t('ban'), accessor: 'ban' },
  {
    Header: t('actions'),
    accessor: 'actions',
    overflow: 'visible',
    Cell: ({ row }: { row: { original: UserData } }) => {
      const { t } = useTranslation('translation', { keyPrefix: 'dropdown' });

      const dropdownItems = [
        {
          icon: <DropdownEditIcon />,
          text: t('edit'),
          onClick: () => {
            handleEditClick(row.original);
          },
        },
        {
          icon: <DropdownDeleteIcon />,
          text: t('delete'),
          color: '#B73535',
          onClick: () => {
            handleDeleteClick(row.original);
          },
        },
      ];

      if (row.original.ban.trim()) {
        dropdownItems.push({
          icon: <DropdownBanIcon />,
          text: t('unban'),
          color: '#B73535',
          onClick: () => {
            handleUnbanClick(row.original);
          },
        });
      } else {
        dropdownItems.push({
          icon: <DropdownBanIcon />,
          text: t('ban'),
          color: '#B73535',
          onClick: () => {
            handleBanClick(row.original);
          },
        });
      }

      return <Dropdown items={dropdownItems} />;
    },
  },
];
