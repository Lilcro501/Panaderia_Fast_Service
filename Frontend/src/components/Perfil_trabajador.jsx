import React from "react";
import "../assets/styles/Perfiltrabajador.css"
import { Link, useNavigate } from "react-router-dom";
import PerfilLogo from "../assets/icons/perfil-negro-2.png"; // actualiza con tu ruta

export default function Perfil_trabajador() {
  const navegacion = useNavigate();
  const EnviarDatos = (e) => {
    e.preventDefault()
    navegacion("/")
  }


  return (
    <div>
        <h1 style={{textAlign: "center"}}>Informacion del Trabajador</h1>
        <br />
        <br />

        <form className="recuadro-perfil" onSubmit={(e) => EnviarDatos(e) }>
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
      </div>
        <button className="boton-actualizar" type="submit">Actualizar Datos</button>
    </form>
    </div>
  );
}

export function MostrarInformacion() {
  const datosUsuario = {
    nombre: "Laura Cano",
    correo: "Lau@example.com",
    direccion: "Calle 464 #53-41",
    telefono: "3125984156",
    rol: "Trabajador"
  };

  return (
    <div className="recuadro-perfil">
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Información de Usuario
      </h1>

      <div style={{ textAlign: "center" }}>
        <img src={PerfilLogo} className="foto-perfil" alt="Foto de perfil" />
      </div>

      <table className="tabla-perfil">
        <tbody>
          <tr>
            <th>Nombre</th>
            <td>{datosUsuario.nombre}</td>
          </tr>
          <tr>
            <th>Correo</th>
            <td>{datosUsuario.correo}</td>
          </tr>
          <tr>
            <th>Dirección</th>
            <td>{datosUsuario.direccion}</td>
          </tr>
          <tr>
            <th>Teléfono</th>
            <td>{datosUsuario.telefono}</td>
          </tr>
          <tr>
            <th>Rol</th>
            <td>{datosUsuario.rol}</td>
          </tr>
        </tbody>
      </table>

      <Link to="/Actualizar">
        <button className="boton-actualizar">Actualizar</button>
      </Link>
    </div>
  );
}
