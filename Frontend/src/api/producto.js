import axios from 'axios';

const obtenerProductosPorCategoria = async (categoria) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/productos/${categoria}/`);
    console.log("Productos recibidos:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
};
