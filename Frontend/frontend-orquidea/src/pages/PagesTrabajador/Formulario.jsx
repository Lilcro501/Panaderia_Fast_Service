import React from "react";
import "../../assets/styles/formulario.css"; 
import Header from "../../components/Header";
import Footer from "../../components/Footer";
// Este es el componente principal
const Formulario = () => {
  return (
    // Contenedor general del formulario
    <div className="contenedor">
      {/* Icono de avatar tipo emoji */}
      <div className="avatar">👤</div>

      {/* Campo para escribir la dirección */}
      <input type="text" placeholder="Dirección" />

      {/* Campo para escribir el número */}
      <input type="text" placeholder="Número" />

      <br /> {/* Salto de línea para separar los campos */}

      {/* Campo para escribir el correo electrónico */}
      <input type="email" placeholder="Correo electrónico" />

      {/* Campo para escribir la contraseña */}
      <input type="password" placeholder="Contraseña" />

      <br /> {/* Otro salto de línea */}

      {/* Botón para guardar los datos */}
      <button className="guardar-btn">Guardar</button>
    </div>
 
  );
};

export default Formulario;
