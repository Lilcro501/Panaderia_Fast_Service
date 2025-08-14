// PrivateRoute.jsx
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRol } from '../Context/RolContext';
import ModalAviso from './ModalAviso';
import '../assets/styles/Loader.css'; // 🔹 Archivo CSS para la animación


const PrivateRoute = ({ children, role }) => {
  const { rol, cargando } = useRol();
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cargando && (!rol || rol === 'sin-registrar')) {
      setMostrarModal(true);
    }
  }, [rol, cargando]);

  // 🔹 Animación mientras carga
  if (cargando) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Validando acceso...</p>
      </div>
    );
  }

  const rolActual = (rol || '').toLowerCase();

  const rolesPermitidos = role
    ? Array.isArray(role)
      ? role.map(r => r.toLowerCase())
      : [role.toLowerCase()]
    : [];

  if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(rolActual)) {
    return <Navigate to="/" replace />;
  }

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
