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
  margin: 0 10px;
  border-radius: 15px;
  width: 560px;
  align-items: center;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 561px;
  width: 100%;
`;

export const ModalInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ModalInput = styled.input`
  border: 0.6px solid ${({ theme }) => theme.secondary.dark};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primary.main};
  padding: 10px 14px;
  color: ${({ theme }) => theme.primary.contrastText};
  font-size: ${({ theme }) => theme.typography.body3.fontSize};
  font-weight: ${({ theme }) => theme.typography.body3.fontWeight};

  &::placeholder {
    color: ${({ theme }) => theme.secondary.dark};
  }
`;

export const StyledEditorWrapper = styled.div`
  .rsw-editor {
    border: 0.6px solid ${({ theme }) => theme.secondary.dark};
    width: 100%;
    height: 200px;
  }

  .rsw-toolbar {
    background-color: ${({ theme }) => theme.secondary.grey};
    flex-wrap: wrap;
  }

  .rsw-btn {
    color: ${({ theme }) => theme.primary.contrastText};
  }

  .rsw-btn:hover {
    background-color: ${({ theme }) => theme.secondary.greyscale};
  }

  .rsw-btn[data-active='true'] {
    background-color: ${({ theme }) => theme.secondary.greyscale};
  }

  .rsw-separator {
    border-right: ${({ theme }) => theme.secondary.grey};
  }

  .rsw-dd {
    display: none;
  }

  .rsw-ce {
    font-family: ${({ theme }) => theme.typography.body3.fontSize};
    font-family: ${({ theme }) => theme.typography.body3.fontWeight};
    color: ${({ theme }) => theme.primary.contrastText};
    font-family: 'Inter';
    overflow-y: auto;
    height: 100px;
  }
`;
