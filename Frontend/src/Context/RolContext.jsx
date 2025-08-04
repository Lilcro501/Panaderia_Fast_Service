import React, { createContext, useContext, useEffect, useState } from 'react';

// Crear el contexto
const RolContext = createContext();

// Hook personalizado para consumir el contexto
export const useRol = () => {
  const ctx = useContext(RolContext);
  if (!ctx) throw new Error('useRol debe usarse dentro de RolProvider');
  return ctx;
};

// Lista de roles válidos
const rolesValidos = ['admin', 'trabajador', 'sin-registrar', 'cliente'];

// Proveedor del contexto
export const RolProvider = ({ children }) => {
  const [rol, setRol] = useState('sin-registrar');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const rolGuardado = (localStorage.getItem('rol') || 'sin-registrar').toLowerCase();

    if (rolesValidos.includes(rolGuardado)) {
      setRol(rolGuardado);
    } else {
      setRol('sin-registrar');
    }

    setCargando(false);
  }, []);

  // Cambiar el rol manualmente
  const cambiarRol = (nuevoRol) => {
    const r = nuevoRol.toLowerCase();
    if (rolesValidos.includes(r)) {
      localStorage.setItem('rol', r);
      setRol(r);
    } else {
      console.warn(`Rol no válido: ${r}`);
    }
  };

  return (
    <RolContext.Provider value={{ rol, cambiarRol, cargando }}>
      {children}
    </RolContext.Provider>
  );
};

