// src/Context/RolContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

// Crear contexto
const RolContext = createContext();

// Hook personalizado
export const useRol = () => {
  const ctx = useContext(RolContext);
  if (!ctx) throw new Error("useRol debe usarse dentro de RolProvider");
  return ctx;
};

// Roles permitidos
const rolesValidos = ["admin", "trabajador", "cliente", "sin-registrar"];

export const RolProvider = ({ children }) => {
  const [rol, setRol] = useState("sin-registrar"); // Por defecto
  const [token, setToken] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Cargar datos desde localStorage al iniciar
  useEffect(() => {
    const rolGuardado = (localStorage.getItem("rol") || "").trim().toLowerCase();
    const tokenGuardado = localStorage.getItem("access");

    if (rolesValidos.includes(rolGuardado)) {
      setRol(rolGuardado);
    } else {
      setRol("sin-registrar"); // Rol por defecto si no es válido
    }

    setToken(tokenGuardado || null);

    // Simular carga rápida
    const timer = setTimeout(() => setCargando(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // Cambiar rol y guardarlo en localStorage
  const cambiarRol = (nuevoRol) => {
    const r = (nuevoRol || "").trim().toLowerCase();
    if (rolesValidos.includes(r)) {
      setRol(r);
      localStorage.setItem("rol", r);
    } else {
      console.warn(`Rol no válido: ${r}`);
    }
  };

  // Guardar o eliminar token en localStorage
  const guardarToken = (nuevoToken) => {
    if (nuevoToken) {
      setToken(nuevoToken);
      localStorage.setItem("access", nuevoToken);
    } else {
      setToken(null);
      localStorage.removeItem("access");
    }
  };

  return (
    <RolContext.Provider
      value={{
        rol,
        token,
        cambiarRol,
        guardarToken,
        cargando,
      }}
    >
      {children}
    </RolContext.Provider>
  );
};
