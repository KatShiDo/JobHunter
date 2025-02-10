import SearchIcon from '../assets/search.svg';
import { SearchInput, StyledSearch, StyledSearchImage } from './styled';
import { useTranslation } from 'react-i18next';
import React from 'react';

interface NavbarSearchProps {
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxWidth: string;
}

export const Search = ({ handleChange, maxWidth }: NavbarSearchProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'search',
  });

  return (
    <StyledSearch $maxWidth={maxWidth}>
      <SearchInput
        onChange={handleChange}
        placeholder={t('placeholder')}
      />
      <StyledSearchImage
        src={SearchIcon}
        alt="search"
      />
    </StyledSearch>
  );
};
