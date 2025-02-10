import styled from '@emotion/styled';
import { StyledTypography } from '../../Typography/styled';

export const UserFormOverlay = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  height: 100%;
  background-color: ${({ theme }) => theme.secondary.light};
`;

export const UserFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.primary.main};
  border-radius: 11px;
  max-width: 561px;
  max-height: 495px;
  width: 100%;
  gap: 15px;
  padding: 38px 26px;
  margin: auto;
  align-items: center;
`;

export const StyledUserForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
  align-items: center;
`;

export const UserFormTitle = styled(StyledTypography)`
  width: max-content;
`;

export const UserFormInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const UserFormInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const UserFormInput = styled.input`
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

export const UserFormForgotPassword = styled(StyledTypography)<{ $display: string }>`
  display: ${({ $display }) => $display};
  color: ${({ theme }) => theme.primary.blue};
`;

export const Line = styled.div<{ $display: string }>`
  display: ${({ $display }) => $display};
  width: 100%;
  height: 1.5px;
  background-color: ${({ theme }) => theme.secondary.dark};
  border-radius: 6px;
`;

export const UserFormFooterButtons = styled.div<{ $display: string }>`
  display: ${({ $display }) => $display};
  flex-direction: column;
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  gap: 8px;
  width: 100%;
`;

export const UserFormFooterButtonBox = styled.div`
  display: flex;
  width: 100%;
`;

export const UserFormAltAuth = styled.div<{ $display: string }>`
  display: ${({ $display }) => $display};
  gap: 5px;
`;
export const UserFormAltAuthLinkText = styled(StyledTypography)`
  color: ${({ theme }) => theme.primary.blue};
  width: max-content;
`;
export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.primary.red};
`;
