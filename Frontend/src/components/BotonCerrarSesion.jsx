import React from "react";
import { useNavigate } from "react-router-dom";
import { useRol } from "../Context/RolContext"; // Importa tu contexto de rol
import { useCarrito } from "../Context/CarritoContext"; // Opcional: limpiar carrito
import "../assets/styles/BotonCerrarSesion.css";

export default function BotonCerrarSesion() {
  const navigate = useNavigate();
  const { cambiarRol, guardarToken } = useRol();
  const { carrito, eliminarProducto } = useCarrito(); // opcional limpiar carrito

  const cerrarSesion = () => {
    // Limpiar rol y token
    cambiarRol("sin-registrar");
    guardarToken(null);

    // Limpiar carrito (opcional)
    carrito.forEach(item => eliminarProducto(item.id));

    // Limpiar localStorage por seguridad
    localStorage.removeItem("rol");
    localStorage.removeItem("access");

    // Redirigir al login
    navigate("/accedeaqui");
  };

  return (
    
    <button className="btn-cerrar-sesion" onClick={cerrarSesion}>
      🚪 Cerrar sesión
    </button>
  );
}
