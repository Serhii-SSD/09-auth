import { api } from './api';
import type { Note } from '@/types/note';
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

// ========== NOTES (server) ==========
export const fetchNotes = async (
  params: FetchNotesParams,
  cookieHeader: string
): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params,
    headers: { Cookie: cookieHeader },
  });
  return data;
};

export const fetchNoteById = async (
  id: string,
  cookieHeader: string
): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });
  return data;
};

export interface SessionResponse {
  success: boolean;
  setCookieHeader?: string | string[];
}

export const checkSession = async (cookieHeader: string): Promise<SessionResponse> => {
  try {
    const response = await api.get('/auth/session', {
      headers: { Cookie: cookieHeader },
    });

    return {
      success: response.data.success === true,
      setCookieHeader: response.headers['set-cookie'],
    };
  } catch {
    return { success: false };
  }
};

// ========== USERS (server) ==========
export const getMe = async (cookieHeader: string): Promise<User> => {
  const { data } = await api.get<User>('/users/me', {
    headers: { Cookie: cookieHeader },
  });
  return data;
};
