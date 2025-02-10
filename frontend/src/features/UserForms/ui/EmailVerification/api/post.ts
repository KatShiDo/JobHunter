import { api } from '@/shared';

export const verifyEmail = async (token: string) => {
  const { status } = await api.post('auth/verify', { token: token });
  return status;
};

export const resendToken = async (email: string) => {
  const { status } = await api.post('auth/resend-token', { email: email });
  return status;
};

export const forgotPassword = async (email: string) => {
  const { status } = await api.post('auth/forgot', { email: email });
  return status;
};
