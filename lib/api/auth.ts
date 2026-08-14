import { api } from './index';
import type { User } from '@/types/user';

export const login = async (email: string, password: string): Promise<User> => {
  const { data } = await api.post<User>('/auth/login', { email, password });
  return data;
};

export const register = async (email: string, password: string): Promise<User> => {
  const { data } = await api.post<User>('/auth/register', { email, password });
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const getSession = async (): Promise<User | null> => {
  try {
    const { data } = await api.get<User>('/auth/session');
    return data;
  } catch {
    return null;
  }
};