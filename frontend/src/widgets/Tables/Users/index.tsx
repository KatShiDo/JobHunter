import { DataTable } from '@/shared';
import { getColumns, UserData } from './model/types.tsx';
import { getUsers } from './api/get.ts';
import { useEffect, useState } from 'react';
import { BanUserModal, EditUserModal, UnbanUserModal, DeleteUserModal } from '@/features';
import { useTranslation } from 'react-i18next';

export const UserTable = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUnbanModalOpen, setIsUnbanModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const { t } = useTranslation('translation', { keyPrefix: 'tables.users' });

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsers();
      setData(users);
    };
    fetchData();
  }, []);

  const handleBanClick = (user: UserData) => {
    setSelectedUser(user);
    setIsBanModalOpen(true);
  };

  const handleEditClick = (user: UserData) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (user: UserData) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleUnbanClick = async (user: UserData) => {
    setSelectedUser(user);
    setIsUnbanModalOpen(true);
  };

  const updateResult = async (status: number) => {
    if (status !== 200) {
      return alert('Error');
    }
    const users = await getUsers();
    setData(users);
  };

  return (
    <>
      <BanUserModal
        isOpen={isBanModalOpen}
        onClose={() => setIsBanModalOpen(false)}
        user={selectedUser}
        onResult={updateResult}
      />
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        onResult={updateResult}
      />
      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        user={selectedUser}
        onResult={updateResult}
      />
      <UnbanUserModal
        isOpen={isUnbanModalOpen}
        onClose={() => setIsUnbanModalOpen(false)}
        user={selectedUser}
        onResult={updateResult}
      />
      <DataTable
        columns={getColumns(
          handleEditClick,
          handleDeleteClick,
          handleBanClick,
          handleUnbanClick,
          t
        )}
        data={data}
      />
    </>
  );
};
