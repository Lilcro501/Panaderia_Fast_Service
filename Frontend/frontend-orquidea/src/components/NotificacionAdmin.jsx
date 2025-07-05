import React from 'react';
import '../assets/styles/NotificacionAdmin.css';

const NotificacionConfirmacion = ({ mensaje, onConfirmar, onCancelar }) => {
  return (
    <div className="fondo-modal">
      <div className="modal-contenido">
        <p>{mensaje}</p>
        <div className="botones-modal">
          <button className="btn-modal aceptar" onClick={onConfirmar}>Aceptar</button>
          <button className="btn-modal cancelar" onClick={onCancelar}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default NotificacionConfirmacion;
