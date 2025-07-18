import api from "./api";
import { Note, UpdatePinPayload, UpdatePublicPayload } from "@/types/note";

export const getAllNotes = async (): Promise<{ notes: Note[] }> => {
  const response = await api.get<{ notes: Note[] }>("/mongo/notes/public");
  return response.data;
};

export const getNotesByMe = async (id: string): Promise<{ notes: Note[] }> => {
  const response = await api.get<{ notes: Note[] }>(`/mongo/notes/${id}`);
  return response.data;
};

export const editNote = async (id: string, payload: Partial<Note>) => {
  const response = await api.patch<{ note: Note }>(`/mongo/notes/edit/${id}`, payload);
  return response.data;
};

export const updateNotePin = async (id: string, payload: Partial<UpdatePinPayload>) => {
  const response = await api.patch(`/mongo/notes/update-pin/${id}`, payload);
  return response.data;
};

export const updateNotePublic = async (id: string, payload: Partial<UpdatePublicPayload>) => {
  const response = await api.patch(`/mongo/notes/update-public/${id}`, payload);
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await api.delete(`/mongo/notes/delete/${id}`);
  return response.data;
};

export const getTagsByMe = async (): Promise<{ tags: string[] }> => {
  const response = await api.get<{ tags: string[] }>("/mongo/notes/tags/me");
  return response.data;
};

export const getNotesByTag = async (tag: string): Promise<{ notes: Note[] }> => {
  const response = await api.get(`/mongo/notes/tags/me/${tag}`);
  return response.data;
};