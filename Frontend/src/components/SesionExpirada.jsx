import React from "react";

export default function SesionExpirada({ onClose }) {
  return (
    <div className="overlay">
      <div className="ventana">
        <h2>⚠️ Sesión expirada</h2>
        <p>Tu sesión ha expirado. Por favor, inicia sesión nuevamente.</p>
        <button onClick={onClose}>Aceptar</button>
      </div>
    </div>
  );
}
