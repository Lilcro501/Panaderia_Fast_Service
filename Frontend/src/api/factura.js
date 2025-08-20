// src/api/factura.js
import axios from 'axios';

export const enviarFactura = async (formData) => {
  try {
    // 👇 Recuperamos el token guardado al iniciar sesión
    const token = localStorage.getItem("access");

    const response = await axios.post(
      'http://localhost:8000/api/carrito/crear-factura/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // Solo si usas cookies de sesión
      }
    );

    return response.data;
  } catch (error) {
    // Manejo mejorado de errores
    if (error.response) {
      console.error('Error de servidor:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });

      const errorMessage = typeof error.response.data === 'object' 
        ? error.response.data.error || JSON.stringify(error.response.data)
        : error.response.data;

      throw new Error(errorMessage || `Error ${error.response.status}`);
    } else if (error.request) {
      console.error('No hubo respuesta:', error.request);
      throw new Error('El servidor no respondió');
    } else {
      console.error('Error de configuración:', error.message);
      throw error;
    }
  }
};
