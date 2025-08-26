import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRol } from '../Context/RolContext';

const PrivateRoute = ({ children, role }) => {
  const { rol, cargando } = useRol();

  if (cargando) {
    return <div>Cargando...</div>;
  }

  // Usar el rol del contexto en lugar de leer directamente de sessionStorage
  const rolActual = rol.toLowerCase();

  // Normalizar rolesPermitidos como array en minúsculas
  const rolesPermitidos = role
    ? Array.isArray(role)
      ? role.map(r => r.toLowerCase())
      : [role.toLowerCase()]
    : [];

  // Si se define role y el rolActual no está permitido
  if (role && !rolesPermitidos.includes(rolActual)) {
    return <Navigate to="/" replace />;
  }

  // ✅ Si children es una función, se le pasa el rol
  if (typeof children === 'function') {
    return children({ userRole: rolActual });
  }

  return children;
};

export default PrivateRoute;