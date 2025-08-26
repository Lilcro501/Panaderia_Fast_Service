import axios from "axios";

// --- Callback global para manejar sesión expirada ---
let sesionExpiradaHandler = null;
export const registrarSesionExpiradaHandler = (handler) => {
  sesionExpiradaHandler = handler;
};

// --- Funciones de sesión ---
export const guardarToken = (access) => {
  sessionStorage.setItem("access", access); // Guardar access token
};

export const eliminarSesion = () => {
  // limpiar todo el storage
  sessionStorage.removeItem("access");
  sessionStorage.removeItem("id_usuario");
  sessionStorage.removeItem("rol");
  sessionStorage.removeItem("nombre");
  sessionStorage.removeItem("loginMetodo");

  // si hay handler registrado (desde React) -> mostrar popup
  if (sesionExpiradaHandler) {
    sesionExpiradaHandler();
  } else {
    // fallback en caso de que no haya Provider
    window.location.href = "/Accedeaqui";
  }
};

// --- API instance ---
const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true, // importante si usas cookies HttpOnly
});

// --- Interceptor de request ---
api.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("access");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// --- Interceptor de response ---
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";

    // Solo disparar "sesión expirada" si el 401 NO viene del login
    if (status === 401 && !url.includes("/api/usuarios/token/")) {
      eliminarSesion();
    }

    return Promise.reject(error);
  }
);

export default api;
