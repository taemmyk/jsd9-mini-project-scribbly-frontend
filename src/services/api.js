import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllNotes = async () => {
  try {
    const response = await api.get("/mongo/notes/public");
    return response.data;
  } catch (err) {
    throw err;
  }
};
