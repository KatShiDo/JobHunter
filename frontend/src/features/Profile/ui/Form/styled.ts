import styled from '@emotion/styled';

export const ProfileFormContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.secondary.greyscale};
  border-radius: 15px;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

export const StyledProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const ProfileFormInputBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 4px;
`;

export const ProfileFormInput = styled.input<{ $changed: boolean }>`
  border: 0.6px solid ${({ theme }) => theme.secondary.dark};
  border-radius: 8px;
  background-color: ${({ $changed }) =>
    $changed ? ({ theme }) => theme.secondary.grey : ({ theme }) => theme.primary.main};
  padding: 10px 14px;
  color: ${({ theme }) => theme.primary.contrastText};
  font-size: ${({ theme }) => theme.typography.body4.fontSize};
  font-weight: ${({ theme }) => theme.typography.body4.fontWeight};

  &::placeholder {
    color: ${({ theme }) => theme.secondary.dark};
  }
  text-align: center;
`;

export const ProfileFormButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
