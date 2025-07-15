// src/api/login.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/usuarios';

// Registro de usuario
export const registrarUsuario = async (datos) => {
  return await axios.post(`${API_URL}/registro/`, datos);
};

// Inicio de sesión
export const iniciarSesion = async ({ email, password }) => {
  return await axios.post(`${API_URL}/login/`, { email, password });
};


export const enviarCodigoAlCorreo = async (email) => {
  return await axios.post(`${API_URL}/enviar-codigo/`, { email });
}

export const cambiarPassword = async ({ email, nueva_password }) => {
  return await axios.post(`${API_URL}/cambiar-password/`, {
    email,
    nueva_password
  });
};