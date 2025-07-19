// src/components/LoginGoogle.jsx
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function LoginGoogle() {
  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/google/', {
        token: credentialResponse.credential
      });

      console.log("✅ Usuario autenticado:", response.data);

      // Si usas JWT, puedes guardar el token aquí
      // localStorage.setItem('token', response.data.token);
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

