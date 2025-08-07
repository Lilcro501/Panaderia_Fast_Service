import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // opcional si quieres redirigir

function LoginGoogle() {
  // const navigate = useNavigate(); // opcional

  const handleSuccess = async (credentialResponse) => {
    try {
      // Enviamos el token de Google al backend
      const response = await axios.post('http://localhost:8000/api/usuarios/login/google/', {
        token: credentialResponse.credential
      });

      const { access, refresh, nombre, rol, id_usuario } = response.data;

      if (access) {
        // Guardamos los datos en localStorage
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
        localStorage.setItem('nombre', nombre);
        localStorage.setItem('rol', rol);
        localStorage.setItem('id_usuario', id_usuario);

        console.log("✅ Usuario autenticado con Google. Token guardado.");

        // Redirigir al usuario (opcional)
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
