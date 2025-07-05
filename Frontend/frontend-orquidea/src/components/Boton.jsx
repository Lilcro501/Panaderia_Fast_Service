// Boton.jsx
import React from "react";
import "./boton.css"; // Estilo general de los botones

const Boton = ({ texto, onClick, tipo = "normal" }) => {
  return (
    <button className={`boton ${tipo}`} onClick={onClick}>
      {texto}
    </button>
  );
};

export default Boton;
