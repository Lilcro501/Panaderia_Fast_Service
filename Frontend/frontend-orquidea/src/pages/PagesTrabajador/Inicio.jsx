import React from 'react';
import "../../assets/styles/";


const Inicio = () => {
  return (
    <div className="inicio-fondo">
      <div className="opciones-inicio">
        {/* Botón de "Pedidos en espera" */}
        <div className="opcion">
          <img src="/assets/img/Carta.png" alt="Pedidos" />
          <button>Pedidos en espera</button>
        </div>

        {/* Botón de "Historial de pedidos" */}
        <div className="opcion">
          <img src="/assets/img/Panes.png" alt="Historial" />
          <button>Historial de pedidos</button>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
