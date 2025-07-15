import axios from 'axios';

export const enviarFactura = async (formData) => {
  try {
    const response = await axios.post(
      'http://localhost:8000/api/carritos/crear-factura/',
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data; // Devuelve la respuesta del backend
  } catch (error) {
    // Si el backend responde con un error, lo mostramos
    throw new Error(error.response?.data?.error || 'Error al enviar la factura');
  }
};
