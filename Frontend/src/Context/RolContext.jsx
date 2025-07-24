import React, { createContext, useContext, useEffect, useState } from 'react';

// Crear el contexto
const RolContext = createContext();

// Hook personalizado para consumir el contexto
export const useRol = () => {
  const ctx = useContext(RolContext);
  if (!ctx) throw new Error('useRol debe usarse dentro de RolProvider');
  return ctx;
};

// Roles válidos que usas en tu app
const rolesValidos = ['cliente', 'administrador', 'trabajador', 'sin-registrar'];

// Proveedor del contexto
export const RolProvider = ({ children }) => {
  const [rol, setRol] = useState('sin-registrar');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const rolGuardado = localStorage.getItem('rol') || 'sin-registrar';

    if (rolesValidos.includes(rolGuardado)) {
      setRol(rolGuardado);
    } else {
      setRol('sin-registrar');
    }

    setCargando(false);
  }, []);

  // Función para cambiar el rol manualmente
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
