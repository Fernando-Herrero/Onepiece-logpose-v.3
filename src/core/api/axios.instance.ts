import { getTokenFromCookies } from "@/src/core/auth/auth.service";
import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "https://eleven-code-api-fernando-herrero.vercel.app/api";
// const baseURL = "http://localhost:4000/api"; // Descomenta para desarrollo local

export const api = axios.create({
  baseURL,
  timeout: 10 * 1000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor de REQUEST: añade el token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookies()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de RESPONSE: maneja errores
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si el token expiró (401), borramos el token y redirigimos
    if (error.response?.status === 401) {
      Cookies.remove("auth_token");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    if (error.response) {
      console.error("Error response:", error.response.data);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }

    return Promise.reject(error);
  }
);
