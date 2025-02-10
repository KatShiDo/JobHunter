import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getQueryParam = (param: string) => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    };

    const refreshToken = getQueryParam('refreshToken');

    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);

      navigate('/');
    } else {
      navigate('/sign-in');
    }
  }, [navigate]);

  return <></>;
};
