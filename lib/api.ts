import axios from 'axios';
import type { Note, NoteTag } from '@/types/note';

const API_URL = 'https://notehub-public.goit.study/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

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

export interface DeleteNoteResponse {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

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

export const deleteNote = async (id: string): Promise<DeleteNoteResponse> => {
  const { data } = await api.delete<DeleteNoteResponse>(`/notes/${id}`);
  return data;
};