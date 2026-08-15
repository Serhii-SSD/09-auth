import axios from 'axios';
import type { Note  } from '@/types/note';
import type { User } from '@/types/user';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

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
  const { data } = await axios.get<FetchNotesResponse>(`${baseURL}/notes`, {
    params,
    headers: { Cookie: cookieHeader },
  });
  return data;
};

export const fetchNoteById = async (
  id: string,
  cookieHeader: string
): Promise<Note> => {
  const { data } = await axios.get<Note>(`${baseURL}/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });
  return data;
};

// ========== AUTH (server) ==========
// Оновлений serverApi.ts
export interface SessionResponse {
  success: boolean;
  setCookieHeader?: string | string[];
}

export const checkSession = async (cookieHeader: string): Promise<SessionResponse> => {
  try {
    const response = await axios.get(`${baseURL}/auth/session`, {
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

// export const checkSession = async (cookieHeader: string): Promise<boolean> => {
//   try {
//     const { data } = await axios.get(`${baseURL}/auth/session`, {
//       headers: { Cookie: cookieHeader },
//     });
//     return data.success === true;
//   } catch {
//     return false;
//   }
// };

// ========== USERS (server) ==========
export const getMe = async (cookieHeader: string): Promise<User> => {
  const { data } = await axios.get<User>(`${baseURL}/users/me`, {
    headers: { Cookie: cookieHeader },
  });
  return data;
};