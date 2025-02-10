import { DataTable } from '@/shared';
import { getColumns, CompanyData } from './model/types.tsx';
import { getVacancies } from './api/get.ts';
import { useEffect, useState } from 'react';
import { EditVacancyModal, DeleteVacancyModal, CreateVacancyModal } from '@/features';
import { CompanyTitle } from '@/widgets/CompanyTitle/index.ts';
import { useTranslation } from 'react-i18next';

export const CompanyTable = () => {
  const [data, setData] = useState<CompanyData[]>([]);
  const [modalState, setModalState] = useState({edit: false, delete: false, create: false});
  const [selectedVacancy, setSelectedVacancy] = useState<CompanyData | null>(null);

  const { t } = useTranslation('translation');

  useEffect(() => {
    (async () => {
      const vacancies = await getVacancies();
      setData(vacancies);
    })();
  }, []);

  const handleAction = (type: keyof typeof modalState) => (vacancy?: CompanyData) => {
    vacancy && setSelectedVacancy(vacancy);
    setModalState(prev => ({...prev, [type]: true}));
  }

  const updateResult = async (status: number) => {
    if (status !== 200) return alert('Error');
    const vacancies = await getVacancies();
    setData(vacancies);
  };

  return (
    <>
      <CompanyTitle onClick={handleAction('create')} />
      <DataTable
        columns={getColumns(handleAction('edit'), handleAction('delete'), t)}
        data={data}
      />
      <CreateVacancyModal
        isOpen={modalState.create}
        onClose={() => setModalState(prev => ({ ...prev, create: false }))}
        onResult={updateResult}
      />
      {modalState.edit && selectedVacancy && (
        <EditVacancyModal
          isOpen={modalState.edit}
          onClose={()=> setModalState(prev => ({ ...prev, edit: false }))}
          vacancy={selectedVacancy}
          onResult={updateResult}
        />
      )}
      {modalState.delete && selectedVacancy && (
        <DeleteVacancyModal
          isOpen={modalState.delete}
          onClose={()=> setModalState(prev => ({ ...prev , delete: false }))}
          vacancy={selectedVacancy}
          onResult={updateResult}
        />
      )}
    </>
  );
};
