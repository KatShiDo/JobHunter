import { ThemeSwitcher, VacancySearch } from '@/features';
import {
  StyledNavBar,
  NavbarLogo,
  NavbarActions,
  ToggleButton,
  NavbarSearchContainer,
} from './styled';
import { useTheme } from '@emotion/react';

import Logo from '../assets/logo.webp';
import { Link } from 'react-router-dom';
import { MenuIcon } from '../assets/Menu';
import { useAppDispatch } from '@/app/model/store';
import { toggleSidebar } from '@/entities';

export const Navbar = () => {
  const theme = useTheme();

  const dispatch = useAppDispatch();

  const handlerToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <StyledNavBar>
      <Link to="/">
        <NavbarLogo
          src={Logo}
          loading="eager"
          alt="JobHunter"
        />
      </Link>
      <NavbarSearchContainer>
        <VacancySearch />
      </NavbarSearchContainer>
      <NavbarActions>
        <ThemeSwitcher />
        <ToggleButton onClick={() => handlerToggleSidebar()}>
          <MenuIcon fill={theme.primary.black} />
        </ToggleButton>
      </NavbarActions>
    </StyledNavBar>
  );
};
