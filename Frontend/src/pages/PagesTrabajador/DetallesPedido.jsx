
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TablaBase from "../../components/TablaBase";
import EtiquetaPago from "../../components/EtiquetaPago";
import datos from "../../Data/data";
import "../../assets/styles/DetallesPedido.css";
import Comp346757 from '../../assets/images/34562.png';

const pedidosPorId = {
  "26263": { productos: [{ id: "pan1", cantidad: 2 }, { id: "pan3", cantidad: 1 }], comprobante: null},
  "34562": { productos: [{ id: "pan8", cantidad: 4 }, { id: "pan10", cantidad: 2 }], comprobante: null},
  "598941": { productos: [{ id: "pan11", cantidad: 3 }, { id: "pan1", cantidad: 1 }], comprobante: null},
  "346757": { productos: [{ id: "pan3", cantidad: 4 }, { id: "pan8", cantidad: 2 }], comprobante: Comp346757}
};


const DetallesPedido = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const pedido = pedidosPorId[id];
  const productosSeleccionados = pedido?.productos || [];
  const comprobanteURL = pedido?.comprobante;
  const allProductos = Object.values(datos).flat();

  const productosConInfo = productosSeleccionados.map((item) => {
    const producto = allProductos.find((p) => p.id === item.id);
    const precioTotal = producto ? producto.price * item.cantidad : 0;
    return {
      nombre: producto?.nameProduct || "Producto no encontrado",
      cantidad: item.cantidad,
      precioUnitario: producto?.price || 0,
      precioTotal,
    };
  });

  const columnas = ["Producto", "Cantidad", "Precio unitario", "Precio total", "Comprobante de pago"];
  
  const datosTabla = productosConInfo.map((p, index) => [
    p.nombre,
    p.cantidad,
    `$${p.precioUnitario.toLocaleString()}`,
    `$${p.precioTotal.toLocaleString()}`,
    index === 0 ? (
      comprobanteURL ? (
        <img
          src={comprobanteURL}
          alt="Comprobante de pago"
          className="comprobante-img"
          style={{ width: "100px", height: "auto", borderRadius: "8px" }}
        />
      ) : (
        <span>Sin comprobante</span>
      )
    ) : null
  ]);

  const totalGeneral = productosConInfo.reduce((sum, p) => sum + p.precioTotal, 0);

  return (
    <div className="contenedor-detalles">
      <h2 className="titulo-detalles">Detalles del pedido #{id}</h2>
      <TablaBase columnas={columnas} datos={datosTabla} />

      <div className="pago-seccion">
        <label className="checkbox">
          <input type="checkbox" className="checkbox-input" /> Pagado
        </label>
        <EtiquetaPago texto={`Total: $${totalGeneral.toLocaleString()}`} />
      </div>

      <div className="contenedor-volver">
        <button className="boton-volver" onClick={() => navigate(-1)}>Volver</button>
      </div>
    </div>
  );
};

export default DetallesPedido;

