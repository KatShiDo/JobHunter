import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/app/model/store';

interface ProtectedRouteProps {
  allowedRoles?: string[];
  checkBan?: boolean;
  checkConfirmation?: boolean;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles = [],
  checkBan = false,
  checkConfirmation = false,
  redirectTo = '/sign-in',
}) => {
  const authStatus = useAppSelector(state => state.authReducer.status);
  const user = useAppSelector(state => state.userReducer.user);
  const userStatus = useAppSelector(state => state.userReducer.status);

  if (authStatus === 'loading') {
    return <div>Загрузка...</div>;
  }

  if (authStatus !== 'success') {
    return (
      <Navigate
        to={redirectTo}
        replace
      />
    );
  }

  if (userStatus === 'loading') {
    return <div>Загрузка...</div>;
  }

  if (userStatus !== 'success') {
    return (
      <Navigate
        to={redirectTo}
        replace
      />
    );
  }

  const userRole = (user && user.role) || '';
  const confirmed = (user && user.confirmed) || false;
  const isBanned = (user && user?.ban?.expiresAt) || false;

  if (
    (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) ||
    checkConfirmation && !confirmed ||
    checkBan && !isBanned
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
