import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const registrarUsuario = async (datos) => {
  return await axios.post(`${API_URL}/registro/`, datos);
};

export const iniciarSesion = async ({ email, password }) => {
  const response = await axios.post(`${API_URL}/login/`, { email, password });
  const { access, refresh, nombre, rol, id_usuario } = response.data;

  sessionStorage.setItem('access', access);
  sessionStorage.setItem('refresh', refresh);
  sessionStorage.setItem('nombre', nombre);
  sessionStorage.setItem('rol', rol);
  sessionStorage.setItem('id_usuario', id_usuario);

  return response;
};

export const enviarCodigoAlCorreo = async (email) => {
  return await axios.post(`${API_URL}/enviar-codigo/`, { email });
};

export const cambiarPassword = async ({ email, nueva_password, codigo }) => {
  return await axios.post(`${API_URL}/cambiar-password/`, {
    email,
    nueva_password,
    codigo,
  });
};
