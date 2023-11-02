import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT || "http://localhost:3000/api",
});
