// src/api/login.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/usuarios';

// Registro de usuario
export const registrarUsuario = async (datos) => {
  return await axios.post(`${API_URL}/registro/`, datos);
};

export const iniciarSesion = async ({ email, password }) => {
  const response = await axios.post(`${API_URL}/login/`, { email, password });

  const { access, refresh, nombre, rol, id_usuario } = response.data;

  localStorage.setItem('access', access);
  localStorage.setItem('refresh', refresh);
  localStorage.setItem('nombre', nombre);
  localStorage.setItem('rol', rol);
  localStorage.setItem('id_usuario', id_usuario);

  return response;
};


// Enviar código de verificación al correo
export const enviarCodigoAlCorreo = async (email) => {
  return await axios.post(`${API_URL}/enviar-codigo/`, { email });
};

// Cambiar contraseña (con código verificado previamente)
export const cambiarPassword = async ({ email, nueva_password, codigo }) => {
  return await axios.post(`${API_URL}/cambiar-password/`, {
    email,
    nueva_password,
    codigo,
  });
};
