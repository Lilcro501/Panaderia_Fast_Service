// LoginGoogle.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginGoogle() {
  const navigate = useNavigate();

  const redirigirPorRol = (rol) => {
    switch (rol) {
      case "cliente":
        navigate("/PerfilUsuario");
        break;
      case "trabajador":
        navigate("/PanelTrabajador");
        break;
      case "administrador":
        navigate("/PanelAdmin");
        break;
      default:
        navigate("/");
    }
  };

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post("http://localhost:8000/api/google-login/", {
        token: credentialResponse.credential,
      });

      const dataUsuario = {
        access: response.data.access,
        refresh: response.data.refresh,
        nombre: response.data.nombre,
        rol: response.data.rol,
        id_usuario: response.data.id_usuario,
      };

      // 🔹 Guardar usuario en localStorage
      localStorage.setItem("usuario", JSON.stringify(dataUsuario));

      // 🔹 Redirigir según rol
      redirigirPorRol(response.data.rol);
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
