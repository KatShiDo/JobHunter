import store, { useAppDispatch } from '@/app/model/store';
import axios from 'axios';
import { logout, fetchPing, updateAccessToken } from '@/features';

const refreshToken = async () => {
  const dispatch = useAppDispatch();
  try {
    const newAccessToken = await dispatch(fetchPing()).unwrap();

    if (newAccessToken) {
      dispatch(updateAccessToken(newAccessToken));
      return newAccessToken;
    }
  } catch (error) {
    dispatch(logout());
    return null;
  }
};

export const api = axios.create({
  baseURL: `/api`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  config => {
    const state = store.getState();
    const accessToken = state.authReducer.data?.accessToken;

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);
