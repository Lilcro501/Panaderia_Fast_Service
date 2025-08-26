import React from "react";
import "../assets/styles/Avatar.css";

const Avatar = ({ nombreCompleto }) => {
  const obtenerInicialApellido = (nombre) => {
    if (!nombre) return "?";

    // Dividimos el nombre en palabras
    const partes = nombre.trim().split(" ");

    // Tomamos la segunda palabra como apellido (si existe)
    const inicialApellido = partes[1] ? partes[1][0].toUpperCase() : partes[0][0].toUpperCase();

    return inicialApellido;
  };

  return (
    <div className="avatar">
      {obtenerInicialApellido(nombreCompleto)}
    </div>
  );
};

export default Avatar;
