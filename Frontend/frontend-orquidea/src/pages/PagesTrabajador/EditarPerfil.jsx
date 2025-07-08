
import React, { useState } from "react";
import "../../assets/styles/EditarPerfil.css";
import { FaUser } from 'react-icons/fa'; 

const EditarPerfil = () => {
  const [formulario, setFormulario] = useState({
    direccion: "",
    numero: "",
    correo: "",
    contraseña: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos guardados:", formulario);
    alert("Cambios guardados correctamente.");
    // Espacio de lógica para enviar los datos al backend
  };

  return (
    <div className="editar-perfil-fondo">
      <h2 className="titulo-perfil">Editar perfil</h2>

      <form className="contenedor-formulario" onSubmit={handleSubmit}>
        <FaUser className="Icono" /> {/* Ícono de usuario */}
        <input type="file"/>Seleccionar archivo

        <div className="campos">
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formulario.direccion}
            onChange={handleChange}
          />
          <input
            type="text"
            name="numero"
            placeholder="Número"
            value={formulario.numero}
            onChange={handleChange}
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formulario.correo}
            onChange={handleChange}
          />
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={formulario.contraseña}
            onChange={handleChange}
          />
        </div>

        <button className="boton-guardar" type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default EditarPerfil;
