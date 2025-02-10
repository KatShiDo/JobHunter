import { useAppSelector } from '@/app/model/store';
import { Links } from '../components/Links/ui';
import { SidebarLinks, StyledSidebar } from './styled';
import { Typography } from '@/shared';
import { Notification } from '@/shared';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@emotion/react';
import { format } from 'date-fns';

export const Sidebar = () => {
  const isSidebarVisible = useAppSelector(state => state.commonReducer.isSidebarVisible);
  const user = useAppSelector(state => state.userReducer.user);

  const { t } = useTranslation('translation');
  const theme = useTheme();

  return (
    <StyledSidebar $isVisible={isSidebarVisible}>
      <SidebarLinks>
        {user?.role === 'employer' && <Typography variant="body3">{user.company?.name}</Typography>}
        <Links />
      </SidebarLinks>

      {user?.ban?.expiresAt ? (
        <Notification
          title={t('notification.ban.title')}
          description={`${t('notification.ban.description')}: ${format(new Date(user.ban.expiresAt), 'yyyy.MM.dd')}`}
          color={theme.primary.red_dark}
          linkText={t('notification.ban.linkText')}
          link={'/contact'}
        />
      ) : (
        user &&
        !user?.confirmed && (
          <Notification
            title={t('notification.email.title')}
            description={t('notification.email.description')}
            color={theme.primary.yellow}
            linkText={t('notification.email.linkText')}
            link={'/email-verification'}
          />
        )
      )}
    </StyledSidebar>
  );
};
