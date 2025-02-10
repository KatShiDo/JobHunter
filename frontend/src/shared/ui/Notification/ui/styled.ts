import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const StyledNotification = styled.div<{ color: string }>`
  border-radius: 15px;
  background: ${props => props.color};
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    color: white;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: underline;
  color: white;
`;
