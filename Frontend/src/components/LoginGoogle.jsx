import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function LoginGoogle() {
  const handleSuccess = async (credentialResponse) => {
    try {
      // Enviamos el token de Google al backend
      const response = await axios.post('http://localhost:8000/api/login/google/', {
        token: credentialResponse.credential
      });

      // El backend debería devolver un token JWT u otro token de sesión
      const token = response.data.access || response.data.token;

      if (token) {
        // Guardamos el token en localStorage para usarlo después
        localStorage.setItem('token', token);
        console.log("✅ Usuario autenticado. Token guardado.");
      } else {
        console.error("❌ El backend no devolvió un token.");
      }
    } catch (error) {
      console.error("❌ Error al autenticar:", error.response?.data || error.message);
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
