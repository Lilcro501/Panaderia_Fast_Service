// PrivateRoute.jsx
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRol } from '../Context/RolContext';
import ModalAviso from './ModalAviso'; // Asegúrate de tener este componente

const PrivateRoute = ({ children, role }) => {
  const { rol, cargando } = useRol();
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Abrir modal si no hay rol válido
    if (!cargando && (!rol || rol === 'sin-registrar')) {
      setMostrarModal(true);
    }
  }, [rol, cargando]);

  if (cargando) return <div>Cargando...</div>;

  const rolActual = (rol || '').toLowerCase();

  const rolesPermitidos = role
    ? Array.isArray(role)
      ? role.map(r => r.toLowerCase())
      : [role.toLowerCase()]
    : [];

  // Validar permisos
  if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(rolActual)) {
    return <Navigate to="/" replace />;
  }

  // Mostrar modal si el usuario no está logueado
  if (mostrarModal) {
    return (
      <ModalAviso
        mensaje="❗ Debes iniciar sesión para acceder a esta página."
        onClose={() => setMostrarModal(false)}
        onConfirm={() => navigate('/accedeaqui')}
      />
    );
  }

  return children;
};

export default PrivateRoute;
