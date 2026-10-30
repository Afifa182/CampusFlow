
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  let token = "";

  for (const key of ["CampusFlow_user", "taskdesk_user"]) {
    try {
      const saved = localStorage.getItem(key);
      if (!saved) continue;

      const user = JSON.parse(saved);

      if (typeof user === "string") {
        token = user;
      } else {
        token = user?.token || user?.accessToken || "";
      }

      if (token) break;
    } catch {
      // Ignore invalid saved data and check the next key.
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const errorMessage = (err) =>
  err.response?.data?.message ||
  err.message ||
  "Cannot reach the server. Is the backend running?";

export default api;
