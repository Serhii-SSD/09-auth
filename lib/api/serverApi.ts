import { api } from './api';
import { cookies } from 'next/headers';
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
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params,
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const fetchNoteById = async (
  id: string
): Promise<Note> => {
  const cookieStore = await cookies();

  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

// ========== AUTH (server) ==========
export const checkSession = async (): Promise<AxiosResponse<CheckSessionData>> => {
  const cookieStore = await cookies();

  try {
    const response = await api.get<CheckSessionData>('/auth/session', {
      headers: { Cookie: cookieStore.toString() },
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
export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await api.get<User>('/users/me', {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};
