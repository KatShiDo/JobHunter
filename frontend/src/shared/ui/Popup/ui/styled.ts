import styled from '@emotion/styled';

export const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(15px);
  z-index: 9999;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.primary.main};
  padding: 25px 35px;
  border-radius: 15px;
  width: 560px;
  align-items: center;
`;
