import React from "react";
import "../assets/styles/Notificacion.css";
import logoFastService from "../assets/icons/logo-Fast_Service.png";

const Notificacion = ({ mensaje, onClose }) => {
  return (
    <div className="noti-fondo">
      <div className="noti-contenido">
        <div className="noti-header">
          <img src={logoFastService} alt="Fast Service" />
        </div>
        <div className="noti-body">
          <p className="noti-icono">🎉🎉🎉</p>
          <h2 className="noti-titulo">¡Gracias!</h2>
          <p className="noti-mensaje">{mensaje}</p>
        </div>
        <div className="noti-footer">
          <button className="noti-boton" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notificacion;

