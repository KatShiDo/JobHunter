import { baseTransition } from '@/shared';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.primary.contrastText};
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 10px;
  border: none;
  border-radius: 12px;
  transition: ${baseTransition};

  &:hover {
    background-color: ${({ theme }) => theme.secondary.main};
  }
`;

export const SidebarTitle = styled.div`
  display: flex;
  gap: 10px;
`;

export const Role = styled.div`
  background-color: ${({ theme }) => theme.secondary.grey};
  padding: 3px 10px;
  border-radius: 8px;
`;
