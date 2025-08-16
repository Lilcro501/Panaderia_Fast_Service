// LoginGoogle.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useRol } from "../Context/RolContext";

export default function LoginGoogle() {
  const navigate = useNavigate();
  const { cambiarRol, guardarToken } = useRol();

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/google-login/",
        { token: credentialResponse.credential }
      );

      // Forzar rol cliente
      const rolForzado = "cliente";

      // Guardar en localStorage primero (asegura persistencia inmediata)
      localStorage.setItem("rol", rolForzado);
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("nombre", response.data.nombre);
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
      guardarToken(response.data.access);
      cambiarRol(rolForzado);

      // Redirigir sin delay
      navigate("/PerfilUsuario", { replace: true });

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
