
import "../assets/styles/PerfilUsuario.css"
import { Link, useNavigate } from "react-router-dom";
import PerfilLogo from "../assets/icons/perfil-negro-2.png"; // actualiza con tu ruta
import React, { useEffect, useState } from 'react';
import axios from 'axios';


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
    nombre: '',
    apellidos: '',
    correo: ''
  });

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const response = await axios.get('/api/usuario/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUsuario(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    obtenerUsuario();
  }, []);

  return (
    <div className="recuadro-perfil">
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Información de Usuario
      </h1>

      <div style={{ textAlign: 'center' }}>
        <img src={PerfilLogo} className="foto-perfil" alt="Foto de perfil" />
      </div>

      <table className="tabla-perfil">
        <tbody>
          <tr>
            <th>Nombre</th>
            <td>{usuario.nombre} {usuario.apellidos}</td>
          </tr>
          <tr>
            <th>Correo</th>
            <td>{usuario.correo}</td>
          </tr>
        </tbody>
      </table>

      <Link to="/Actualizar">
        <button className="boton-actualizar">Actualizar</button>
      </Link>
    </div>
  );
}
