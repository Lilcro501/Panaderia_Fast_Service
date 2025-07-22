import React, { createContext, useContext, useEffect, useState } from 'react';

const RolContext = createContext();

export const RolProvider = ({ children }) => {
  const [rol, setRol] = useState('sinregistrar');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const rolGuardado = localStorage.getItem('rol') || 'sinregistrar';
    setRol(rolGuardado);
    setCargando(false);
  }, []);

  const cambiarRol = (nuevo) => {
    const r = nuevo.toLowerCase();
    localStorage.setItem('rol', r);
    setRol(r);
  };

  return (
    <RolContext.Provider value={{ rol, cambiarRol, cargando }}>
      {children}
    </RolContext.Provider>
  );
};

export const useRol = () => {
  const ctx = useContext(RolContext);
  if (!ctx) throw new Error('useRol debe usarse dentro de RolProvider');
  return ctx;
};
