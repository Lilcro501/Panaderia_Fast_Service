// src/components/Estadopedido.jsx
import React from "react";
import "../../assets/styles/"

const EstadoPedido = ({ estado }) => {
  let claseExtra = "";

  switch (estado) {
    case "pendiente":
      claseExtra = "estado-pendiente";
      break;
    case "enviado":
      claseExtra = "estado-enviado";
      break;
    case "entregado":
      claseExtra = "estado-entregado";
      break;
    default:
      claseExtra = "estado-desconocido";
  }

  return (
    <div className={`estado-pedido ${claseExtra}`}>
      {estado}
    </div>
  );
};

export default EstadoPedido;


