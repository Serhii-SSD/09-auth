import { api } from './api';
import type { Note, NoteTag } from '@/types/note';
import type { User } from '@/types/user';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

// ========== NOTES ==========
export const fetchNotes = async (params: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>('/notes', { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: CreateNoteParams): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

// ========== AUTH ==========
export const register = async (email: string, password: string): Promise<User> => {
  const { data } = await api.post<User>('/auth/register', { email, password });
  return data;
};

export const login = async (email: string, password: string): Promise<User> => {
  const { data } = await api.post<User>('/auth/login', { email, password });
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<boolean> => {
  try {
    const { data } = await api.get('/auth/session');
    return data.success === true;
  } catch {
    return false;
  }
};

// ========== USERS ==========
export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export const updateMe = async (user: Partial<User>): Promise<User> => {
  const { data } = await api.patch<User>('/users/me', user);
  return data;
};
