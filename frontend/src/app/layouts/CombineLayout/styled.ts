import styled from '@emotion/styled';
export const StyledCombineLayout = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.secondary.light};
  gap: 50px;
  overflow: hidden;
`;

export const OutletContainer = styled.div`
  padding: 25px 37px 0 0;
  width: 100%;
  gap: 25px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;

  @media (max-width: 850px) {
    padding: 30px 10px;
  }
`;
