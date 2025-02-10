import { useTranslation } from 'react-i18next';
import { UsersIcon } from '../assets/icons/Users';
import { ProfileIcon } from '../assets/icons/Profile';
import { DashboardIcon } from '../assets/icons/Dashboard';
import { VacanciesIcon } from '../assets/icons/Vacancies';
import { CompanyIcon } from '../assets/icons/Company';
import { ResponsesIcon } from '../assets/icons/Responses';
import { ReportsIcon } from '../assets/icons/Reports';
import { SignOutIcon } from '../assets/icons/SignOut';
import { useAppDispatch } from '@/app/model/store';
import { logout } from '@/features';

export type Link = {
  image: ({ fill }: { fill: string }) => JSX.Element;
  url?: string;
  text: string;
  role?: boolean;
  isBlocked?: boolean;
  onClick?: () => void;
};

type LinksDataType = {
  user: Link[];
  employer: Link[];
  admin: Link[];
  default: Link[];
};

export const LinksData = (): LinksDataType => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const links = {
    user: [
      {
        image: ProfileIcon,
        url: '/profile',
        text: t('title.profile'),
        role: true,
      },
      {
        image: VacanciesIcon,
        url: '/vacancies',
        text: t('title.vacancies'),
      },
      {
        image: ResponsesIcon,
        url: '/responses',
        text: t('title.responses'),
        isBlocked: true,
      },
      {
        image: SignOutIcon,
        onClick: () => {
          dispatch(logout());
        },
        text: t('title.signOut'),
      },
    ],
    employer: [
      {
        image: CompanyIcon,
        url: '/company',
        text: t('title.company'),
        isBlocked: true,
      },
      {
        image: ProfileIcon,
        url: '/profile',
        text: t('title.profile'),
        role: true,
      },
      {
        image: VacanciesIcon,
        url: '/vacancies',
        text: t('title.vacancies'),
      },
      {
        image: ResponsesIcon,
        url: '/responses',
        text: t('title.responses'),
        isBlocked: true,
      },
      {
        image: SignOutIcon,
        onClick: () => {
          dispatch(logout());
        },
        text: t('title.signOut'),
      },
    ],
    admin: [
      {
        image: ProfileIcon,
        url: '/profile',
        text: t('title.profile'),
        role: true,
      },
      {
        image: DashboardIcon,
        url: '/dashboard',
        text: t('title.dashboard'),
      },
      {
        image: VacanciesIcon,
        url: '/vacancies',
        text: t('title.vacancies'),
      },
      {
        image: ReportsIcon,
        url: '/reports',
        text: t('title.reports'),
      },
      {
        image: UsersIcon,
        url: '/users',
        text: t('title.users'),
      },
      {
        image: SignOutIcon,
        onClick: () => {
          dispatch(logout());
        },
        text: t('title.signOut'),
      },
    ],
    default: [
      {
        image: VacanciesIcon,
        url: '/vacancies',
        text: t('title.vacancies'),
      },
      {
        image: SignOutIcon,
        url: '/sign-in',
        text: t('title.signIn'),
      },
    ],
  };

  return links;
};
