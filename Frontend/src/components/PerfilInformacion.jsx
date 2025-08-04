
import "../assets/styles/perfil.css"

import { Link, useNavigate } from "react-router-dom";
import PerfilLogo from "../assets/icons/perfil-negro-2.png"; // actualiza con tu ruta
import React, { useEffect, useState } from 'react';
import axios from 'axios';



export default function PerfilInformacion() {
  const navegacion = useNavigate();
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Token no encontrado. Redirigiendo a login...");
      navegacion("/login"); 
      return;
    }

    const obtenerUsuario = async () => {
      try {
        const response = await api.get("usuarios/perfil/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsuario({
          nombre: response.data.nombre,
          apellido: response.data.apellido || "",
          email: response.data.email,
        });
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    obtenerUsuario();
  }, [navegacion]);

  const EnviarDatos = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await api.put("usuarios/perfil/", usuario, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      alert("Datos actualizados correctamente");
      navegacion("/Home");
    } catch (error) {
      console.error("Error al actualizar datos:", error);
      alert("Ocurrió un error al actualizar los datos.");
    }
  };

  return (
    <div>

        <h1 style={{textAlign: "center"}}>Información de usuario</h1>
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
      <Link to="/Home">
       <button className="boton-actualizar" type="submit">Actualizar Datos</button>
      </Link>
       
    </form>

    </div>
  );
}


export function MostrarInformacion() {
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: ""
  });

  const navegacion = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navegacion("/login");
      return;
    }

    const obtenerUsuario = async () => {
      try {
        const response = await api.get("usuarios/perfil/"); 
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    obtenerUsuario();
  }, [navegacion]);

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
            <th>Contraseña</th>
            <td>********</td>
          </tr>
        </tbody>
      </table>

      <Link to="/Actualizar">
        <button className="boton-actualizar">Actualizar</button>
      </Link>
    </div>
  );
}
