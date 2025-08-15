import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRol } from '../Context/RolContext'; // importar el hook

const PrivateRoute = ({ children, role }) => {
  const { rol, cargando } = useRol();

  if (cargando) {
    return <div>Cargando...</div>;
  }

  const rolActual = (rol || '').toLowerCase();
  const rolesPermitidos = role
    ? Array.isArray(role)
      ? role.map(r => r.toLowerCase())
      : [role.toLowerCase()]
    : [];

  if (role && !rolesPermitidos.includes(rolActual)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
