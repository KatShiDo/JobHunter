import styled from '@emotion/styled';

export const StyledDropdown = styled.div`
  position: relative;
`;

export const DropdownButton = styled.button`
  background: transparent;
  outline: none;
  border: none;
`;

export const DropdownList = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: ${({ theme }) => theme.secondary.light};
  border: 0.5px solid ${({ theme }) => theme.secondary.dark};
  border-radius: 10px;
  padding: 10px;
  z-index: 999;
`;

export const DropdownItem = styled.button`
  outline: none;
  border: none;
  background: transparent;
  display: flex;
  gap: 10px;
  padding: 10px;
`;

export const StyledText = styled.p<{ $color: string }>`
  color: ${({ $color }) => $color};
`;
