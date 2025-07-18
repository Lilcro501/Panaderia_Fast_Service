
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const userRol = localStorage.getItem('rol');

  if (!userRol) {
    return <Navigate to="/Login" />;
  }

  if (role && userRol !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
