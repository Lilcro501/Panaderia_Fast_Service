
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PerfilLogo from "../assets/icons/perfil-negro-2.png";
import "../assets/styles/InfoCliente.css";

export function MostrarInformacion() {
  const { id } = useParams();
  const navigate = useNavigate();

  const datosClientes = {
    cliente1: { nombre: "Camila Pérez", correo: "camila@gmail.com", direccion: "Calle 123 #45-67", telefono: "3101234567" },
    cliente2: { nombre: "Juan García", correo: "juan@gmail.com", direccion: "Cra 12 #34-56", telefono: "3209876543" },
    cliente3: { nombre: "Laura Ríos", correo: "laura@gmail.com", direccion: "Av 9 #76-89", telefono: "3001122334" },
    cliente4: { nombre: "Pedro Torres", correo: "pedro@gmail.com", direccion: "Calle 10 #11-12", telefono: "3112233445" },
  };

  const datosUsuario = datosClientes[id] || {
    nombre: "Desconocido",
    correo: "N/A",
    direccion: "N/A",
    telefono: "N/A",
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
          <tr><th>Nombre</th><td>{datosUsuario.nombre}</td></tr>
          <tr><th>Correo</th><td>{datosUsuario.correo}</td></tr>
          <tr><th>Dirección</th><td>{datosUsuario.direccion}</td></tr>
          <tr><th>Teléfono</th><td>{datosUsuario.telefono}</td></tr>
        </tbody>
      </table>

      <button className="boton-salir" onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
}
