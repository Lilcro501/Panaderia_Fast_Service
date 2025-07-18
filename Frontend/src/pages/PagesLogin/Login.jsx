
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
    // Simulación automática de inicio como Cliente
    localStorage.setItem("rol", "Cliente");

    // Redirigir automáticamente según el rol
    const rol = localStorage.getItem("rol");

    switch (rol) {
        case "Admin":
        navigate("/AdministrarInven");
        break;
        case "Trabajador":
        navigate("/Inicio");
        break;
        case "Cliente":
        navigate("/Home");
        break;
        case "SinRegistrar":
        navigate("/");
        break;
        default:
        navigate("/Login");
    }
}, [navigate]);

    return null;
};

export default Login;
