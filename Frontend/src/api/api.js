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
  withCredentials: true, // importante para enviar cookies HttpOnly
});

// --- Interceptor de request ---
api.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("access");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// --- Queue para evitar múltiples refresh requests ---
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  failedQueue = [];
};

// --- Interceptor de response ---
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el access token expira
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Llamada al endpoint que devuelve nuevo access token usando cookie HttpOnly
        const response = await axios.post(
          "http://localhost:8000/api/usuarios/refresh_token/",
          {},
          { withCredentials: true }
        );

        const { access } = response.data;
        if (!access) throw new Error("No se recibió access token");

        guardarToken(access);
        originalRequest.headers["Authorization"] = `Bearer ${access}`;
        processQueue(null, access);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        eliminarSesion(); // cerrar sesión si falla refresh
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
