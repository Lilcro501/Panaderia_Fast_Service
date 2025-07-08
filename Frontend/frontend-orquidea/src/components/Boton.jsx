
import React from "react";
import "../assets/styles/boton.css";

const Boton = ({ texto, onClick }) => {
  return (
    <button className="boton-personalizado" onClick={onClick}>
      {texto}
    </button>
  );
};

export default Boton;
