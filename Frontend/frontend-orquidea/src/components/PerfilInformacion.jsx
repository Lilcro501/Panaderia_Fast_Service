import React from "react";
import "../assets/styles/PerfilUsuario.css"
import PerfilLogo from "../assets/icons/perfil-negro-2.png"
import { Link, useNavigate } from "react-router-dom";



export default function PerfilInformacion() {
  const navegacion = useNavigate();
  const EnviarDatos = (e) => {
    e.preventDefault()
    navegacion("/")
  }


  return (
    <div>
        <h1 style={{textAlign: "center"}}>Informacion de usuario</h1>
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

        <label>
          <strong>Rol:</strong>
          <input
            className="entrada"
            type="text"
            name="rol"
          />
        </label>
      </div>
        <button className="boton-actualizar" type="submit">Actualizar Datos</button>
    </form>
    </div>
  );
}


export function MostrarInformacion() {
  // Ejemplo de datos; puedes reemplazar con datos reales o props
  const datosUsuario = {
    nombre: "Cristian",
    correo: "juan@example.com",
    direccion: "Calle 123 #45-67",
    telefono: "3001234567",
    rol: "Uusario"
  };

  return (
    <div className="recuadro-perfil">
      <h1 style={{ textAlign: "center" }}>Información de usuario</h1>
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <img src={PerfilLogo} className="foto-perfil" alt="Foto de perfil"/>
      </div>
      <br />
      <table className="tabla-perfil" style={{ margin: "0 auto", borderCollapse: "collapse", width: "60%" }}>
        <tbody>
          <tr>
            <th style={estiloCelda}>Nombre</th>
            <td style={estiloCelda}>{datosUsuario.nombre}</td>
          </tr>
          <tr>
            <th style={estiloCelda}>Correo</th>
            <td style={estiloCelda}>{datosUsuario.correo}</td>
          </tr>
          <tr>
            <th style={estiloCelda}>Dirección</th>
            <td style={estiloCelda}>{datosUsuario.direccion}</td>
          </tr>
          <tr>
            <th style={estiloCelda}>Teléfono</th>
            <td style={estiloCelda}>{datosUsuario.telefono}</td>
          </tr>
          <tr>
            <th style={estiloCelda}>Rol</th>
            <td style={estiloCelda}>{datosUsuario.rol}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <Link to="/Actualizar"><button className="boton-actualizar">Actualizar</button></Link>
    </div>
  );
}

const estiloCelda = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left"
};
