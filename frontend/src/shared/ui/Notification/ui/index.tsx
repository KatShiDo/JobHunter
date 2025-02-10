import { Typography } from '@/shared';
import { StyledLink, StyledNotification } from './styled.ts';

interface NotificationProps {
  title: string;
  description: string;
  color: string;
  linkText?: string;
  link?: string;
}

export const Notification = ({ title, description, color, link, linkText }: NotificationProps) => {
  return (
    <StyledNotification color={color}>
      <Typography variant="body5">{title}</Typography>
      <Typography variant="body6">{description}</Typography>
      {link && (
        <StyledLink to={link}>
          <Typography variant={'body7'}>{linkText}</Typography>
        </StyledLink>
      )}
    </StyledNotification>
  );
};
