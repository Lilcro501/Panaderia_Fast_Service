// src/api/factura.js
import axios from 'axios';

export const enviarFactura = async (factura, productos) => {
  try {
    const response = await axios.post(
      'http://localhost:8000/api/crear-factura/',
      {
        ...factura,
        productos, // carrito completo
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al enviar la factura');
  }
};
