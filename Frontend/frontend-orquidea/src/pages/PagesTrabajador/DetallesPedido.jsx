
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TablaBase from "../../components/TablaBase";
import EtiquetaPago from "../../components/EtiquetaPago";
import datos from "../../Data/data";
import "../../assets/styles/DetallesPedido.css";

const pedidosPorId = {
  "26263": [{ id: "pan1", cantidad: 2 }, { id: "pan3", cantidad: 1 }],
  "34562": [{ id: "pan8", cantidad: 4 }, { id: "pan10", cantidad: 2 }],
  "598941": [{ id: "pan11", cantidad: 3 }, { id: "pan1", cantidad: 1 }],
  "346757": [{ id: "pan3", cantidad: 4 }, { id: "pan8", cantidad: 2 }]
};

const DetallesPedido = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const productosSeleccionados = pedidosPorId[id] || [];
  const allProductos = Object.values(datos).flat();

  const productosConInfo = productosSeleccionados.map((item) => {
    const producto = allProductos.find((p) => p.id === item.id);
    const precioTotal = producto.price * item.cantidad;
    return {
      nombre: producto.nameProduct,
      cantidad: item.cantidad,
      precioUnitario: producto.price,
      precioTotal,
    };
  });

  const columnas = ["Producto", "Cantidad", "Precio unitario", "Precio total"];
  const datosTabla = productosConInfo.map((p) => [
    p.nombre,
    p.cantidad,
    `$${p.precioUnitario.toLocaleString()}`,
    `$${p.precioTotal.toLocaleString()}`
  ]);

  const totalGeneral = productosConInfo.reduce((sum, p) => sum + p.precioTotal, 0);

  return (
    <div className="contenedor-detalles">
      <h2 className="titulo">Detalles del pedido #{id}</h2>
      <TablaBase columnas={columnas} datos={datosTabla} />
      <div className="pago-seccion">
        <label>
          <input type="checkbox" /> Pagado
        </label>
        <EtiquetaPago texto={`Total: $${totalGeneral.toLocaleString()}`} />
      </div>

      <button className="boton-volver" onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
};

export default DetallesPedido;
