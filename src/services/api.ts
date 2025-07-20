import axios, { AxiosError, AxiosResponse } from "axios";

const API_BASE_URL = "https://jsd9-mini-project-scribbly-backend.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    // console.log("🔼 Sending request to:", config.url);
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log("✅ Got response:", response.status);
    return response;
  },
  (error: AxiosError) => {
    // console.error("❌ API error:", error.response?.status);
    return Promise.reject(error);
  }
);

export default api;
