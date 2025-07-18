import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
    // Asignar el rol automáticamente como 'Cliente'
    localStorage.setItem("rol", "cliente");

    // Redirigir a la ruta /Home
    navigate("/Home");
    }, [navigate]);

    return null; // No se muestra nada en pantalla
};

export default Login;
