// src/api/factura.js
import axios from 'axios';

export const enviarFactura = async (formData) => {
  try {
    const response = await axios.post(
      'http://localhost:8000/api/crear-factura/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // Si usas cookies de sesión
      }
    );
    return response.data;
  } catch (error) {
    // Manejo mejorado de errores
    if (error.response) {
      // El servidor respondió con un estado fuera de 2xx
      console.error('Error de servidor:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
      
      // Si el servidor devuelve texto plano en errores
      const errorMessage = typeof error.response.data === 'object' 
        ? error.response.data.error || JSON.stringify(error.response.data)
        : error.response.data;
      
      throw new Error(errorMessage || `Error ${error.response.status}`);
    } else if (error.request) {
      // La solicitud fue hecha pero no hubo respuesta
      console.error('No hubo respuesta:', error.request);
      throw new Error('El servidor no respondió');
    } else {
      // Error al configurar la solicitud
      console.error('Error de configuración:', error.message);
      throw error;
    }
  }
};