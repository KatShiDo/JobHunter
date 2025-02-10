import styled from '@emotion/styled';

export const StyledSearch = styled.div<{ $maxWidth: string }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  min-width: 100px;
  max-width: ${({ $maxWidth }) => $maxWidth};
`;

export const SearchInput = styled.input`
  background-color: ${({ theme }) => theme.primary.main};
  border: 0.6px solid ${({ theme }) => theme.secondary.dark};
  border-radius: 12px;
  padding: 10px 35px 10px 14px;
  height: 100%;
  width: inherit;
  font-size: ${({ theme }) => theme.typography.body6.fontSize};
  font-weight: ${({ theme }) => theme.typography.body6.fontWeight};
  color: ${({ theme }) => theme.primary.contrastText};

  &::placeholder {
    color: ${({ theme }) => theme.secondary.dark};
  }
`;

export const StyledSearchImage = styled.img`
  position: absolute;
  right: 14px;
`;
