import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const userRol = localStorage.getItem('rol');
  console.log('🎯 Rol guardado:', userRol);
  console.log('🔒 Rol requerido:', role);

  if (!userRol) {
    console.warn('🔁 Redirigiendo a /Login (no hay rol)');
    return <Navigate to="/Login" />;
  }

  // Comparando en minúsculas para evitar errores por mayúsculas
  if (role && userRol.toLowerCase() !== role.toLowerCase()) {
    console.warn('⛔ Acceso denegado. Redirigiendo a /');
    return <Navigate to="/" />;
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