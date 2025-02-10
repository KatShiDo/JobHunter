import styled from '@emotion/styled';

export const StyledVacanciesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Vacancy = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${({ theme }) => theme.secondary.light};
  border: 1px solid ${({ theme }) => theme.secondary.dark};
  border-radius: 15px;
  gap: 10px;
`;
