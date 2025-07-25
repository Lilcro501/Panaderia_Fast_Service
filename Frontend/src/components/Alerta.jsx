import React from "react";
import "../assets/styles/Alerta.css";

const Alerta = ({ mensaje, onClose }) => {
  return (
    <div className="mod-fondo">
      <div className="mod-contenido">
        <div className="mod-body">
          <p className="mod-icono">⚠️</p>
          <h2 className="mod-titulo">¡Disculpa!</h2>
          <p className="mod-mensaje">{mensaje}</p>
        </div>
        <div className="mod-footer">
          <button className="mod-boton" onClick={onClose}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alerta;
