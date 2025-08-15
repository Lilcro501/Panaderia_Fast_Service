import React, { createContext, useContext, useEffect, useState } from "react";

const RolContext = createContext();

// ✅ Export con nombre
export const useRol = () => {
  const ctx = useContext(RolContext);
  if (!ctx) throw new Error("useRol debe usarse dentro de RolProvider");
  return ctx;
};

const rolesValidos = ["admin", "trabajador", "cliente", "sin-registrar"];

export const RolProvider = ({ children }) => {
  const [rol, setRol] = useState("sin-registrar");
  const [token, setToken] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const rolGuardado = localStorage.getItem("rol")?.trim().toLowerCase() || "sin-registrar";
    const tokenGuardado = localStorage.getItem("access") || null;

    if (rolesValidos.includes(rolGuardado)) {
      setRol(rolGuardado);
    } else {
      setRol("sin-registrar");
    }

    setToken(tokenGuardado);
    setCargando(false);
  }, []);

  const cambiarRol = (nuevoRol) => {
    const r = nuevoRol?.trim().toLowerCase() || "sin-registrar";
    if (rolesValidos.includes(r)) {
      setRol(r);
      localStorage.setItem("rol", r);
    }
  };

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
    <RolContext.Provider value={{ rol, token, cambiarRol, guardarToken, cargando }}>
      {children}
    </RolContext.Provider>
  );
};
