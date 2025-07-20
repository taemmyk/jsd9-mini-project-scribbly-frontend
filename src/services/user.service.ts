import api from "./api";
import { AxiosError } from "axios";

export const logoutUser = async () => {
  try {
    await api.post("/mongo/logout");
  } catch (err: unknown) {
    if (err && typeof err === "object" && "response" in err) {
      const error = err as AxiosError<{ message: string }>;
      console.error("❌ Logout error:", error.response?.data || error.message);
      alert(
        "Logout failed: " + (error.response?.data?.message || "Unknown error")
      );
    } else {
      console.error("❌ Logout error:", err);
      alert("Logout failed");
    }
  }
};
