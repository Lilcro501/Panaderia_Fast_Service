// src/components/BotonCerrarSesion.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

import "../assets/styles/BotonCerrarSesion.css";

export default function BotonCerrarSesion() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    // Elimina datos del usuario
    localStorage.removeItem("token"); 
    localStorage.removeItem("usuario"); 
    // O si usas sessionStorage:
    // sessionStorage.clear();

    // Redirige al login
    navigate("/Accedeaqui");
  };

  return (
    <button className="btn-cerrar-sesion" onClick={cerrarSesion}>
      🚪 Cerrar sesión
    </button>
  );
}
 