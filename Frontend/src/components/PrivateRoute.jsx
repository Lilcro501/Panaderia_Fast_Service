import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRol } from '../Context/RolContext';

const PrivateRoute = ({ children, role }) => {
  const { rol, cargando } = useRol();

  if (cargando) {
    return <div>Cargando...</div>;
  }

  const rolActual = (rol || '').toLowerCase();

  // Acepta role como string o array
  const rolesPermitidos = role
    ? Array.isArray(role)
      ? role.map(r => r.toLowerCase())
      : [role.toLowerCase()]
    : [];

  console.log('🎯 Rol actual:', rolActual);
  console.log('🔒 Roles permitidos:', rolesPermitidos);

  if (!rolActual) {
    console.warn('🔁 Redirigiendo a /Login (no hay rol)');
    return <Navigate to="/" replace />;
  }

  if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(rolActual)) {
    console.warn('⛔ Acceso denegado. Redirigiendo a /');
    return <Navigate to="/" replace />;
  }

  console.log('✅ Acceso permitido');
  return children;
};

export default PrivateRoute;
