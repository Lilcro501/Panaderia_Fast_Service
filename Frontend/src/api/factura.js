// src/api/factura.js
import api from './axiosconfig'; // Usar la instancia configurada

export const enviarFactura = async (formData) => {
  try {
    const token = sessionStorage.getItem("access"); // Cambiado de localStorage a sessionStorage
    if (!token) {
      throw new Error("Token no encontrado. Por favor, inicia sesión nuevamente.");
    }

    console.log("Datos enviados a POST /api/carrito/crear-factura/:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    const response = await api.post(
      'carrito/crear-factura/', // URL relativa, ya que baseURL está en axiosConfig.js
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          // No es necesario agregar Authorization aquí, el interceptor lo maneja
        },
        // withCredentials: true, // Comentar si no usas cookies de sesión
      }
    );

    console.log("Respuesta de POST /api/carrito/crear-factura/:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error de servidor:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
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