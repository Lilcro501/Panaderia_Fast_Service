import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

// ✅ Crear instancia de axios con token automático
const axiosAuth = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

axiosAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

function LoginGoogle() {
  const handleSuccess = async (credentialResponse) => {
    try {
      // 🔐 Paso 1: Enviar token de Google al backend
      const response = await axios.post('http://localhost:8000/api/usuarios/login/google/', {
        token: credentialResponse.credential
      });

      // 🔐 Paso 2: Recibir y guardar token y datos del usuario
      const { access, refresh, nombre, rol, id_usuario } = response.data;

      if (access) {
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
        localStorage.setItem('nombre', nombre);
        localStorage.setItem('rol', rol);
        localStorage.setItem('id_usuario', id_usuario);

        console.log("✅ Usuario autenticado con Google. Token guardado.");

        // ✅ Paso 3: Hacer petición protegida usando el token
        const userResponse = await axiosAuth.get('datos-usuario/');
        console.log("🙋‍♂️ Datos del usuario autenticado:", userResponse.data);

        // ✅ Paso 4 (opcional): Redirigir al usuario
        // navigate('/perfil');

      } else {
        console.error("❌ El backend no devolvió un token.");
      }
    } catch (error) {
      console.error("❌ Error al autenticar con Google:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log('❌ Error en el login con Google');
        }}
      />
    </div>
  );
}

export default LoginGoogle;
