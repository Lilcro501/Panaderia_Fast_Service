import "../assets/styles/PerfilUsuario.css";
import PerfilLogo from "../assets/icons/perfil-negro-2.png";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosconfig";

export function PerfilUsuarioTrabajador() {
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: ""
  });

  const navegacion = useNavigate();
  const { id } = useParams(); // <- aquí corregido

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      navegacion("/accedeaqui");
      return; 
    }

    const obtenerUsuarioDeFactura = async () => {
      try {
        const response = await api.get(`trabajador/facturas/${id}/`); 
        setUsuario(response.data.usuario);
      } catch (error) {
        console.error("Error al obtener los datos de la factura:", error);
      }
    };

    obtenerUsuarioDeFactura();
  }, [navegacion, id]);

  return (
    <div className="recuadro-perfil">
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Información del Cliente
      </h1>

      <div style={{ textAlign: "center" }}>
        <img src={PerfilLogo} className="foto-perfil" alt="Foto de perfil" />
      </div>

      <table className="tabla-perfil">
        <tbody>
          <tr>
            <th>Nombre</th>
            <td>{usuario.nombre}</td>
          </tr>
          <tr>
            <th>Apellido</th>
            <td>{usuario.apellido}</td>
          </tr>
          <tr>
            <th>Correo</th>
            <td>{usuario.email}</td>
          </tr>
          <tr>
            <th>Teléfono</th>
            <td>{usuario.telefono}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PerfilUsuarioTrabajador;
