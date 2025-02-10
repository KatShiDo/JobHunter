import { api } from '@/shared';
import { UserData } from '../model/types';

interface UserParams {
  _id: string;
  middlename: string;
  username: string;
  email: string;
  avatar: string;
  role: string;
  ban: {
    expiresAt: string;
    reason: string;
  };
  actions: string;
}

export const getUsers = async (): Promise<UserData[]> => {
  const response = await api.get('/admin/user/all');

  const users: UserData[] = [];

  response.data.forEach((user: UserParams) => {
    if (user && user._id) {
      users.push({
        _id: user._id,
        middlename: user.middlename,
        username: user.username,
        email: user.email,
        avatar: `${import.meta.env.VITE_API_BASE_URL}/uploads/${user.avatar}`,
        role: user.role,
        ban: `${user.ban?.expiresAt || ''} ${user.ban?.reason || ''}`,
        actions: user._id,
      });
    } else {
      console.warn('User data is missing:', user);
    }
  });

  return users;
};
