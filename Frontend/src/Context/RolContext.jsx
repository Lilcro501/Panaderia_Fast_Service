import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import SesionExpirada from "../components/SesionExpirada";
import { useNavigate } from "react-router-dom";

const RolContext = createContext();

export const useRol = () => {
  const ctx = useContext(RolContext);
  if (!ctx) throw new Error("useRol debe usarse dentro de RolProvider");
  return ctx;
};

const rolesValidos = ["admin", "trabajador", "cliente", "sin-registrar"];

export const RolProvider = ({ children }) => {
  const navigate = useNavigate();
  const [rol, setRol] = useState("sin-registrar");
  const [token, setToken] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [showSesionExpirada, setShowSesionExpirada] = useState(false);

  // 🔹 Recuperar sesión
  useEffect(() => {
    const rolGuardado = sessionStorage.getItem("rol")?.trim().toLowerCase() || "sin-registrar";
    const tokenGuardado = sessionStorage.getItem("access") || null;

    if (rolesValidos.includes(rolGuardado)) {
      setRol(rolGuardado);
    } else {
      setRol("sin-registrar");
    }

    setToken(tokenGuardado);
    setCargando(false);
  }, []);

  // 🔹 Función para cambiar rol
  const cambiarRol = (nuevoRol) => {
    const r = nuevoRol?.trim().toLowerCase() || "sin-registrar";
    if (rolesValidos.includes(r)) {
      setRol(r);
      sessionStorage.setItem("rol", r);
    }
  };

  // 🔹 Función para guardar token
  const guardarToken = (nuevoToken) => {
    if (nuevoToken) {
      setToken(nuevoToken);
      sessionStorage.setItem("access", nuevoToken);
    } else {
      setToken(null);
      sessionStorage.removeItem("access");
    }
  };

  // 🔹 Cerrar sesión (cuando expira token)
  const cerrarSesion = () => {
    setRol("sin-registrar");
    setToken(null);
    sessionStorage.removeItem("rol");
    sessionStorage.removeItem("access");
    setShowSesionExpirada(false);
    navigate("/"); // 👉 aquí puedes poner "/login" si prefieres
  };

  // 🔹 Axios instance con interceptor
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        setShowSesionExpirada(true);
      }
      return Promise.reject(error);
    }
  );

  return (
    <RolContext.Provider
      value={{
        rol,
        token,
        cambiarRol,
        guardarToken,
        cargando,
        cerrarSesion,
        axiosInstance,
      }}
    >
      {children}
      {showSesionExpirada && <SesionExpirada onClose={cerrarSesion} />}
    </RolContext.Provider>
  );
};
