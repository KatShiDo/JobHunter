import styled from '@emotion/styled';

export const StyledProfileAvatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  @media (max-width: 850px) {
    width: 100px;
    height: 100px;
    justify-content: flex-start;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
