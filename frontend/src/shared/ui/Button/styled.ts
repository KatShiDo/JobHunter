import styled from '@emotion/styled';
import { ButtonProps } from './';

export const StyledButton = styled('button')<ButtonProps>`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  transition: 0.3s background-color;
  color: ${({ theme }) => theme.primary.contrastText};
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};

  ${({ variant, theme, maxHeight }) => {
    switch (variant) {
      case 'primary':
        return `
          display: flex;
          gap: 8px;
          justify-content: center;
          align-items: center;
          height: 100%;
          padding: 14px 20px;
          font-size: ${theme.typography.body3.fontSize};
          border-radius: 10px;
          background-color: ${theme.secondary.grey};
          border: 0.6px solid ${theme.secondary.dark};
          max-height: ${maxHeight};

          &:hover {
            background-color: ${theme.secondary.main};
          }
        `;
      case 'secondary':
        return `
          display: flex;
          gap: 8px;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
          max-height: ${maxHeight};
          padding: 14px 20px;
          border-radius: 10px;
          background-color: ${theme.secondary.light};
          border: 0.6px solid ${theme.secondary.dark};

          &:hover {
            background-color: ${theme.secondary.main};
          }
        `;
      default:
        return '';
    }
  }}
`;
