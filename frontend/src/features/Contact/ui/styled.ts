import styled from '@emotion/styled';

export const StyledContact = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContactContainer = styled.div`
  background: ${({ theme }) => theme.secondary.greyscale};
  border-radius: 15px;
  max-width: 600px;
  width: 100%;
  padding: 20px 35px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ContactText = styled.div`
  text-align: center;
`;

export const StyledContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ContactInput = styled.input`
  background: ${({ theme }) => theme.secondary.main};
  padding: 10px 14px;
  border-radius: 8px;
  resize: vertical;
  font-family: 'Inter';
  font-size: ${({ theme }) => theme.typography.body6.fontSize};
  font-weight: ${({ theme }) => theme.typography.body6.fontWeight};
  color: ${({ theme }) => theme.primary.contrastText};
  border: 0.6px solid ${({ theme }) => theme.secondary.dark};
`;
