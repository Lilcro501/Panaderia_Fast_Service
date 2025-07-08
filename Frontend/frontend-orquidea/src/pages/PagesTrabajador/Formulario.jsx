
import React from "react";
import "../../assets/styles/formulario.css"; 
import { FaUser } from 'react-icons/fa'; 

const Formulario = () => {
  return (
    // Contenedor general del formulario
    <div className="contenedor">
      
      <FaUser className="avatar" /> {/* Icono */}
      <input type="text" placeholder="Dirección" /> {/* Campo para escribir la dirección */}
      <input type="text" placeholder="Número" /> {/* Campo para escribir el número */}

      <br /> {/* Salto de línea para separar los campos */}

      <input type="email" placeholder="Correo electrónico" /> {/* Campo para escribir el correo electrónico */}
      <input type="password" placeholder="Contraseña" /> {/* Campo para escribir la contraseña */}

      <br /> {/* Salto de línea */}

      <button className="guardar-btn">Guardar</button> {/* Botón para guardar los datos */}
    </div>
  );
};

export default Formulario;
