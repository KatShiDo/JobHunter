import styled from '@emotion/styled';

export const StyledNavBar = styled.nav`
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 50px;
  box-sizing: border-box;
  height: 73px;
  background-color: ${({ theme }) => theme.secondary.greyscale};

  @media (max-width: 850px) {
    padding: 5px 15px;
  }
`;

export const NavbarLogo = styled.img`
  width: 153px;
  @media (max-width: 850px) {
    width: 120px;
  }
`;

export const NavbarSearchContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  @media (max-width: 850px) {
    display: none;
  }
`;

export const NavbarActions = styled.div`
  display: flex;
  align-items: center;
  height: 43px;
  gap: 20px;
`;

export const ToggleButton = styled.button`
  width: 43px;
  height: 43px;
  background-color: ${({ theme }) => theme.primary.main};
  border: 0.6px solid ${({ theme }) => theme.secondary.dark};
  border-radius: 15px;

  @media (min-width: 850px) {
    display: none;
  }
`;
