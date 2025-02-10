import { api } from '@/shared';

export const uploadAvatar = (file: File | null) => {
  const formData = new FormData();
  if (!file) {
    return new Error('Файл не выбран');
  }
  formData.append('avatar', file);
  return api.post('user/avatar/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
