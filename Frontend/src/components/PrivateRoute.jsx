import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRol } from '../Context/RolContext';

const PrivateRoute = ({ children, role }) => {
  const { rol, cargando } = useRol();

  if (cargando) {
    return null; 
  }

  console.log('🎯 Rol actual:', rol);
  console.log('🔒 Rol requerido:', role);

  if (!rol) {
    console.warn('🔁 Redirigiendo a /Login (no hay rol)');
    return <Navigate to="/Login" replace />;
  }

  if (role && rol.toLowerCase() !== role.toLowerCase()) {
    console.warn('⛔ Acceso denegado. Redirigiendo a /');
    return <Navigate to="/" replace />;
  }

  console.log('✅ Acceso permitido');
  return children;
};

export default PrivateRoute;

/* 
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const userRol = localStorage.getItem('rol')?.toLowerCase();
  if (!userRol) return <Navigate to="/login" />;
  if (role && userRol !== role.toLowerCase()) return <Navigate to="/" />;
  return children;
};
export default PrivateRoute; 
*/ 