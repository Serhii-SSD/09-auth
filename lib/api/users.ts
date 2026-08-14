import { api } from './index';
import type { User } from '@/types/user';

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export const updateMe = async (user: Partial<User>): Promise<User> => {
  const { data } = await api.patch<User>('/users/me', user);
  return data;
};