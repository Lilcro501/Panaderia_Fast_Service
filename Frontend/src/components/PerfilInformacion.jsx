import "../assets/styles/PerfilUsuario.css";
import PerfilLogo from "../assets/icons/perfil-negro-2.png";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosconfig";
import BotonCerrarSesion from "./BotonCerrarSesion";

export default function PerfilInformacion() {
  const navegacion = useNavigate();
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
  });

  const [modal, setModal] = useState({ visible: false, mensaje: "" });
  const [loginGoogle, setLoginGoogle] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access");
    const metodoLogin = localStorage.getItem("loginMetodo");

    if (!token) {
      console.warn("Token no encontrado. Redirigiendo a login...");
      navegacion("/accedeaqui");
      return;
    }

    // Detectar si el login fue con Google
    if (metodoLogin === "google") {
      setLoginGoogle(true);
    }

    const obtenerUsuario = async () => {
      try {
        const response = await api.get("usuarios/perfil/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuario({
          nombre: response.data.nombre,
          apellido: response.data.apellido || "",
          email: response.data.email,
        });
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        setModal({
          visible: true,
          mensaje: "Error al obtener los datos del usuario.",
        });
      }
    };

    obtenerUsuario();
  }, [navegacion]);

  const EnviarDatos = async (e) => {
    e.preventDefault();
    if (loginGoogle) return; // No permitir enviar si es Google

    const token = localStorage.getItem("access");

    try {
      await api.put("usuarios/perfil/", usuario, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setModal({
        visible: true,
        mensaje: "Datos actualizados correctamente.",
      });
    } catch (error) {
      console.error("Error al actualizar datos:", error);
      setModal({
        visible: true,
        mensaje: "Ocurrió un error al actualizar los datos.",
      });
    }
  };

  const cerrarModal = () => setModal({ visible: false, mensaje: "" });

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Información de usuario</h1>
      <form className="recuadro-perfil" onSubmit={EnviarDatos}>
        <img src={PerfilLogo} className="foto-perfil" alt="Foto de perfil" />
        <div className="datos1">
          <label>
            <strong>Nombre:</strong>
            <input
              className="entrada"
              type="text"
              name="nombre"
              value={usuario.nombre}
              onChange={(e) =>
                setUsuario({ ...usuario, nombre: e.target.value })
              }
              disabled={loginGoogle}
            />
          </label>
          <label>
            <strong>Apellido:</strong>
            <input
              className="entrada"
              type="text"
              name="apellido"
              value={usuario.apellido}
              onChange={(e) =>
                setUsuario({ ...usuario, apellido: e.target.value })
              }
              disabled={loginGoogle}
            />
          </label>
          <label>
            <strong>Correo:</strong>
            <input
              className="entrada-texto"
              type="email"
              name="email"
              value={usuario.email}
              onChange={(e) =>
                setUsuario({ ...usuario, email: e.target.value })
              }
              disabled // El correo no se debería cambiar
            />
          </label>
        </div>

        {!loginGoogle ? (
          <button className="boton-actualizar" type="submit">
            Actualizar Datos
          </button>
        ) : (
          <p style={{ color: "red", textAlign: "center" }}>
            No puedes modificar tus datos porque iniciaste sesión con Google.
          </p>
        )}
      </form>

      {modal.visible && (
        <div className="modal">
          <div className="modal-contenido">
            <p>{modal.mensaje}</p>
            <button onClick={cerrarModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export function MostrarInformacion() {
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
  });

  const navegacion = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      navegacion("/accedeaqui");
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
        </tbody>
      </table>

      <Link to="/Actualizar">
        <button className="boton-actualizar">Actualizar</button>
      </Link>
      <br />

      <BotonCerrarSesion />
    </div>
  );
}
