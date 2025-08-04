import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRol } from "../../Context/RolContext";

const Login = () => {
  const navigate = useNavigate();
  const { cambiarRol } = useRol();

  useEffect(() => {
    cambiarRol("cliente"); // Cambia el contexto y localStorage

    // Retardo leve para evitar conflictos con rutas protegidas
    const timer = setTimeout(() => {
      navigate("/home");
    }, 100);

    return () => clearTimeout(timer);
  }, [navigate, cambiarRol]);

  return null;
};

export default Login;
