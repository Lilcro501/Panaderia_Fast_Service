import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRol } from '../Context/RolContext';

const PrivateRoute = ({ children, role }) => {
  const { rol, cargando } = useRol();

  if (cargando) {
    return <div>Cargando...</div>; 
  }

  // Tomar primero del localStorage si el contexto aún no está actualizado
  const rolActual = (localStorage.getItem("rol") || rol || "").toLowerCase();

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

  return children;
};

export default PrivateRoute;
