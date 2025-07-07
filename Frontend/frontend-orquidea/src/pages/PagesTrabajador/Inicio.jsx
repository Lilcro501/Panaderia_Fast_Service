import React from 'react';
import "../../assets/styles/inicio.css"

const Inicio = () => {
  return (
    <div className="inicio-fondo">
      <div className="opciones-inicio">
        {/* Opción: Pedidos en espera */}
        <div className="opcion">
          <div class="borde">
          <div className="imagen-carta"></div>
          </div>
          <button>Pedidos en espera</button>
        </div>

        {/* Opción: Historial de pedidos */}
        <div className="opcion">
          <div class="borde">
          <div className="imagen-panes"></div>
          </div>
          <button>Historial de pedidos</button>
        </div>
      </div>
    </div>
  );
};

export default Inicio;

