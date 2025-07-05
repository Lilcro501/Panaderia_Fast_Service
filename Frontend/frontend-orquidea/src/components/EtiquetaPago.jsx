// Importamos React para poder usar JSX
import React from "react";

// Importamos el estilo para la etiqueta
import "../assets/style/pedido.css"; // O cámbialo si tienes otro archivo CSS

// Este componente solo muestra un texto dentro de una cajita bonita
const EtiquetaPago = ({ texto }) => {
  return (
    <span className="etiqueta-pago">
      {texto}
    </span>
  );
};

export default EtiquetaPago;
