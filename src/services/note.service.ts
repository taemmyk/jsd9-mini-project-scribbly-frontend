import api from "./api";
import { Note } from "@/types/note";

export const getAllNotes = async (): Promise<{ notes: Note[] }> => {
  const response = await api.get<{ notes: Note[] }>("/mongo/notes/public");
  return response.data;
};