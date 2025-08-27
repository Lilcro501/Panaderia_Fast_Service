
import React from "react";
import "../assets/styles/EstadoPedido.css";

const Boton = ({ texto, onClick }) => {
  return (
    <button className="boton-completado" onClick={onClick}>
      {texto}
    </button>
  );
};

export default Boton;
  