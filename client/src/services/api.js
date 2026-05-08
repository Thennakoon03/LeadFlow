import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const createApiClient = (token) =>
  axios.create({
    baseURL: API_BASE_URL,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });

const loginRequest = (credentials) =>
  axios.post(`${API_BASE_URL}/api/auth/login`, credentials);

export { API_BASE_URL, createApiClient, loginRequest };
