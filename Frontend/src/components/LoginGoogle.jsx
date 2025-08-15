// LoginGoogle.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useRol } from "../Context/RolContext"; // Asegúrate que la ruta es correcta

export default function LoginGoogle() {
  const navigate = useNavigate();
  const { cambiarRol } = useRol();

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/google-login/",
        { token: credentialResponse.credential }
      );

      // Forzar rol cliente
      const rolForzado = "cliente";

      // Guardar en localStorage
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("nombre", response.data.nombre);
      localStorage.setItem("rol", rolForzado);
      localStorage.setItem("id_usuario", response.data.id_usuario);
      localStorage.setItem(
        "usuario",
        JSON.stringify({
          access: response.data.access,
          refresh: response.data.refresh,
          nombre: response.data.nombre,
          rol: rolForzado,
          id_usuario: response.data.id_usuario,
        })
      );

      // Actualizar contexto
      cambiarRol(rolForzado);

      // Redirigir después de un pequeño delay para asegurar actualización
      setTimeout(() => {
        navigate("/PerfilUsuario");
      }, 100);
    } catch (error) {
      console.error("Error en login con Google:", error);
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => console.log("Error en autenticación Google")}
      />
    </div>
  );
}
