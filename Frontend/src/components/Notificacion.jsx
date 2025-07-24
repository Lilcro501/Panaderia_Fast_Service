import React from "react";
import "../assets/styles/Notificacion.css";
import logoFastService from "../assets/icons/logo-Fast_Service.png";

const Notificacion = ({ mensaje, onClose }) => {
  return (
    <div className="notificacion-fondo">
      <div className="notificacion-contenido">
        <div className="notificacion-header">
          <img src={logoFastService} alt="Fast Service" />
        </div>
        <div className="notificacion-body">
          <p className="notificacion-icono">🎉🎊🎉</p>
          <h2 className="notificacion-titulo">¡Gracias!</h2>
          <p className="notificacion-mensaje">{mensaje}</p>
        </div>
        <div className="notificacion-footer">
          <button className="notificacion-boton" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notificacion;

