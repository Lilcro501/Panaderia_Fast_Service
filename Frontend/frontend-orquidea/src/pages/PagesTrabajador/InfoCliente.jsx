import React from 'react';
import '../../assets/styles/infoCliente.css';


const InfoCliente = () => {
  return (
    <div className="cliente-fondo">
      <div className="cliente-card">
        {/* Imagen del perfil */}
        <div className="cliente-img"></div>

        {/* Campos de información */}
        <input type="text" placeholder="Nombre" />
        <input type="text" placeholder="Apellido" />
        <input type="email" placeholder="Correo electrónico" />
        <input type="text" placeholder="Dirección" />
        <input type="text" placeholder="Número" />

        {/* Botones */}
        <div className="botones-cliente">
          <button className="whatsapp-btn">📱</button>
          <button className="salir-btn">Salir</button>
        </div>
      </div>
    </div>
  );
};

export default InfoCliente;
