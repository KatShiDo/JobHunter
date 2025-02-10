import styled from '@emotion/styled';

export const StyledSidebar = styled.div<{ $isVisible: boolean }>`
  max-width: 320px;
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.primary.main};

  @media (max-width: 850px) {
    display: ${props => (props.$isVisible ? 'flex' : 'none')};
    position: absolute;
    max-width: none;
    height: auto;
  }
`;

export const SidebarLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
