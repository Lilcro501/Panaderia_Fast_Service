import axios from 'axios';

export const obtenerUsuarioPorId = async (id_usuario) => {
  try {
    const response = await axios.get(`/api/usuarios/${id_usuario}/`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    throw error;
  }
};
