import React from "react";
import "../assets/styles/Alerta.css";

const Alerta = ({ mensaje, onClose }) => {
  return (
    <div className="modal-fondo">
      <div className="modal-contenido">
        <div className="modal-body">
          <p className="modal-icono">⚠️</p>
          <h2 className="modal-titulo">¡Disculpa!</h2>
          <p className="modal-mensaje">{mensaje}</p>
        </div>
        <div className="modal-footer">
          <button className="modal-boton" onClick={onClose}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alerta;
