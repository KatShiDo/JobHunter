import { Sidebar } from '@/widgets';
import { Outlet } from 'react-router-dom';
import { OutletContainer, StyledCombineLayout } from './styled';

export const CombineLayout = () => {
  return (
    <>
      <StyledCombineLayout>
        <Sidebar />
        <OutletContainer>
          <Outlet />
        </OutletContainer>
      </StyledCombineLayout>
    </>
  );
};
