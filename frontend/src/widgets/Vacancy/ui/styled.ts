import styled from '@emotion/styled';

export const StyledVacancy = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 50px;
  @media (max-width: 1300px) {
    flex-direction: column;
    gap: 70px;
  }
`;

export const VacancyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  width: 100%;
`;

export const VacancyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
`;

export const VacancyCompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const VacancyDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  p {
    width: 100%;
  }

  a {
    color: ${({ theme }) => theme.primary.blue};
  }
`;

export const DescriptionText = styled.div`
  max-width: 600px;
`;

export const VacancyMap = styled.iframe`
  border: 0.6px solid ${({ theme }) => theme.secondary.dark};
  border-radius: 15px;
  width: 600px;
  height: 300px;

  @media (max-width: 1300px) {
    flex-direction: column;
    width: 100%;
  }
`;
