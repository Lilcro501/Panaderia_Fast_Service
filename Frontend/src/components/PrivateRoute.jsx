import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRol } from '../Context/RolContext';

const PrivateRoute = ({ children, role }) => {
  const { rol, cargando } = useRol();

  // Si el contexto sigue cargando, mostramos un loader en lugar de evaluar acceso
  if (cargando) {
    return <div>Cargando...</div>; // Aquí puedes poner tu loader real
  }

  const rolActual = (rol || '').toLowerCase();

  // Normalizamos roles permitidos
  const rolesPermitidos = role
    ? Array.isArray(role)
      ? role.map(r => r.toLowerCase())
      : [role.toLowerCase()]
    : [];

  console.log('🎯 Rol actual:', rolActual);
  console.log('🔒 Roles permitidos:', rolesPermitidos);

  // Si no hay rol (y ya terminó de cargar), redirigir
  if (!rolActual || rolActual === 'sin-registrar') {
    console.warn('🔁 Redirigiendo a /Login (no hay rol válido)');
    return <Navigate to="/Login" replace />;
  }

  // Validar permisos
  if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(rolActual)) {
    console.warn('⛔ Acceso denegado. Redirigiendo a /');
    return <Navigate to="/" replace />;
  }

  console.log('✅ Acceso permitido');
  return children;
};

export default PrivateRoute;


