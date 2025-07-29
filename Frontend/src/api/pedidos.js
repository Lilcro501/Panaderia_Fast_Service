export const obtenerPedidosPorFactura = async (idFactura) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8000/api/facturas/${idFactura}/pedidos/`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error('Error al obtener pedidos');
    return await response.json();
  } catch (error) {
    console.error("Error en obtenerPedidosPorFactura:", error);
    throw error;
  }
};

