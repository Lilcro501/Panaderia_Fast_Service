import React from "react";
import "../assets/styles/Modal.css"; // Asegúrate de que esta ruta sea correcta
import campana from "../assets/images/campana.png";

const ModalAviso = ({ mensaje, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <img src={campana} alt="campana" width="30px" />
        <p>{mensaje}</p>
        <div className="modal-buttons">
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalAviso;
