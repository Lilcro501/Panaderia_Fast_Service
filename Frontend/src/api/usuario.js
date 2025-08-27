// services/usuarioService.js
import api from './api/axiosconfig';  // <-- importamos la instancia configurada

export const obtenerUsuarioPorId = async (id_usuario) => {
  try {
    const response = await api.get(`usuarios/${id_usuario}/`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    throw error;
  }
};
