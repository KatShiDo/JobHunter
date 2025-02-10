import { Role, SidebarTitle, StyledLink } from './styled';
import { Link, LinksData } from '../model/data';
import { Typography } from '@/shared/';
import { useTheme } from '@emotion/react';
import { useAppDispatch, useAppSelector } from '@/app/model/store';
import { useTranslation } from 'react-i18next';
import { toggleSidebar } from '@/entities';

export const Links = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'title.roles',
  });

  const links = LinksData();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.userReducer.user);

  const role = useAppSelector(state => state.userReducer.user?.role) || 'default';

  const confirmed = user?.confirmed ?? false;
  const isBanned = Boolean(user?.ban?.expiresAt);

  const isLinkBlocked = (link: Link): boolean => {
    return Boolean(link.isBlocked && (!confirmed || isBanned));
  };

  const handleClick = (link: Link) => {
    dispatch(toggleSidebar());
    if (link.onClick) {
      link.onClick();
    }
  };

  return (
    <>
      {links[role as keyof typeof links].map(link =>
        !isLinkBlocked(link) ? (
          <StyledLink
            key={link.text}
            onClick={() => handleClick(link)}
            to={link.url ?? ''}
          >
            <SidebarTitle>
              <link.image fill={theme.primary.black} />
              <Typography variant="body3">{link.text}</Typography>
            </SidebarTitle>
            {link?.role !== undefined && (
              <Role>
                <Typography variant="body3">{t(role)}</Typography>
              </Role>
            )}
          </StyledLink>
        ) : null
      )}
    </>
  );
};
