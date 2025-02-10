import styled from '@emotion/styled';

export const StyledProfile = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 850px) {
    justify-content: flex-start;
  }
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  max-width: 480px;
  width: 100%;
  gap: 20px;
  align-items: center;
`;
