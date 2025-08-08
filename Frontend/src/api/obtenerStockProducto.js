import api from "./axiosconfig"

const obtenerStockProducto = async (idProducto) => {
  try {
    const response = await api.get(`carrito/producto/${idProducto}/`);
    return response.data.quantity;
  } catch (error) {
    console.error("Error al obtener el stock del producto:", error);
    return null;
  }
};

export default obtenerStockProducto;
