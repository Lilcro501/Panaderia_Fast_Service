import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRol } from "../../Context/RolContext";

const Login = () => {
    const navigate = useNavigate();
    const { cambiarRol } = useRol();

    useEffect(() => {
    cambiarRol("cliente"); // Cambia el contexto y localStorage
    navigate("/home"); // Redirige al home del cliente
    }, [navigate, cambiarRol]);

    return null;
};

export default Login;
