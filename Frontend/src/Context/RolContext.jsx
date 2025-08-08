import React, { createContext, useContext, useEffect, useState } from 'react';

const RolContext = createContext();

export const useRol = () => {
  const ctx = useContext(RolContext);
  if (!ctx) throw new Error('useRol debe usarse dentro de RolProvider');
  return ctx;
};

const rolesValidos = ['admin', 'trabajador', 'sin-registrar', 'cliente'];

export const RolProvider = ({ children }) => {
  const [rol, setRol] = useState('sin-registrar');
  const [token, setToken] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Recuperar datos del localStorage
    const rolGuardado = (localStorage.getItem('rol') || 'sin-registrar').toLowerCase();
    const tokenGuardado = localStorage.getItem('access');

    if (rolesValidos.includes(rolGuardado) && tokenGuardado) {
      setRol(rolGuardado);
      setToken(tokenGuardado);
    } else {
      setRol('sin-registrar');
      setToken(null);
    }

    // Simular verificación rápida del token antes de quitar el "cargando"
    // Aquí podrías llamar a tu backend para verificar que el token sigue siendo válido
    setTimeout(() => {
      setCargando(false);
    }, 100);
  }, []);

  const cambiarRol = (nuevoRol) => {
    const r = nuevoRol.toLowerCase();
    if (rolesValidos.includes(r)) {
      localStorage.setItem('rol', r);
      setRol(r);
    } else {
      console.warn(`Rol no válido: ${r}`);
    }
  };

  const guardarToken = (nuevoToken) => {
    if (nuevoToken) {
      localStorage.setItem('access', nuevoToken);
      setToken(nuevoToken);
    } else {
      localStorage.removeItem('access');
      setToken(null);
    }
  };

  return (
    <RolContext.Provider value={{ rol, token, cambiarRol, guardarToken, cargando }}>
      {children}
    </RolContext.Provider>
  );
};
