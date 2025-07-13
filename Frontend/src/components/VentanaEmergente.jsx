import React from 'react';
import '../assets/styles/VentanaEmergente.css';

const VentanaEmergente = ({ visible, onClose, title, content, footer }) => {
  if (!visible) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close-btn" onClick={onClose}>✖</button>
        </div>

        <div className="modal-body">
          {content}
        </div>

        {/* Envolvemos el footer con una clase para alinear botones */}
        {footer && (
          <div className="modal-footer contenedor-botones-modal">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default VentanaEmergente;
