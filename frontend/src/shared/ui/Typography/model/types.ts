import { typographyList } from './data';

export interface TypographyProps {
  variant: keyof typeof typographyList.typography;
  children: React.ReactNode;
}
