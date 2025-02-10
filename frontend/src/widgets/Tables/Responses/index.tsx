import { DataTable } from '@/shared';
import { getColumns, ReponsesData } from './model/types.tsx';
import { getResponse } from './api/get.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/app/model/store.ts';
import { DeleteResponseModal } from '@/features';

export const ResponsesTable = () => {
  const [data, setData] = useState<ReponsesData[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<ReponsesData | null>(null);
  const { t } = useTranslation('translation');
  const user = useAppSelector(state => state.userReducer.user);

  useEffect(() => {
    const fetchData = async () => {
      const responses = await getResponse();
      setData(responses);
    };
    fetchData();
  }, []);

  const handleDeleteClick = async (vacancy: ReponsesData) => {
    setSelectedResponse(vacancy);
    setIsDeleteModalOpen(true);
  };

  const updateResult = async (status: number) => {
    if (status !== 200) {
      return alert('Error');
    }
    const responses = await getResponse();
    setData(responses);
  };

  return (
    <>
      <DataTable
        columns={getColumns(handleDeleteClick, user?.role ?? '', t)}
        data={data}
      />
      {isDeleteModalOpen && selectedResponse && (
        <DeleteResponseModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          response={selectedResponse}
          onResult={updateResult}
        />
      )}
    </>
  );
};
