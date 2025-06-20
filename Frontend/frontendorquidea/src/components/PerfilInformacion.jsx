import React from "react";
import "../assets/styles/PerfilUsuario.css"
import PerfilLogo from "../assets/icons/perfil-negro-2.png"
import { Link } from "react-router-dom";


export default function PerfilUsuario() {
  return (
    <div>
        <h1 style={{textAlign: "center"}}>Informacion de usuario</h1>
        <br />
        <br />

        <form className="recuadro-perfil">
      <img src={PerfilLogo} className="foto-perfil" alt="Foto de perfil" />

      <div className="datos1">
        <label>
          <strong>Nombre:</strong>
          <input
            className="entrada"
            type="text"
            name="nombre"
          />
        </label>

        <label>
          <strong>Correo:</strong>
          <input
            className="entrada"
            type="email"
            name="correo"
          />
        </label>

        <label>
          <strong>Dirección:</strong>
          <input
            className="entrada"
            type="text"
            name="direccion"
          />
        </label>

        <label>
          <strong>Teléfono:</strong>
          <input
            className="entrada"
            type="text"
            name="telefono"
          />
        </label>

        <label>
          <strong>Rol:</strong>
          <input
            className="entrada"
            type="text"
            name="rol"
          />
        </label>
      </div>

     <Link to="/actualizar">
        <button className="boton-actualizar">Actualizar Datos</button>
      </Link>
    </form>
    </div>
  );
}



