import { Search } from '@/shared';
import React, { useRef } from 'react';
import { useAppDispatch } from '@/app/model/store.ts';
import { setSearchQuery } from '@/entities';
import { useNavigate } from 'react-router-dom';

export const VacancySearch = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      dispatch(setSearchQuery(value));
      if (window.location.href != '/vacancies') {
        navigate('/vacancies');
      }
    }, 1500);
  };
  return (
    <Search
      handleChange={handleSearch}
      maxWidth={'480px'}
    />
  );
};
