import { api } from './api';
import type { AxiosResponse } from 'axios';
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

export interface CheckSessionData {
  success: boolean;
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

// ========== AUTH (server) ==========
export const checkSession = async (cookieHeader: string): Promise<AxiosResponse<CheckSessionData>> => {
  try {
    const response = await api.get<CheckSessionData>('/auth/session', {
      headers: { Cookie: cookieHeader },
    });
    return response;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response: AxiosResponse<CheckSessionData> };
      if (axiosError.response) {
        return axiosError.response;
      }
    }
    throw error;
  }
};

// ========== USERS (server) ==========
export const getMe = async (cookieHeader: string): Promise<User> => {
  const { data } = await api.get<User>('/users/me', {
    headers: { Cookie: cookieHeader },
  });
  return data;
};
