import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TablaBase from "../../components/TablaBase";
import EtiquetaPago from "../../components/EtiquetaPago";
import axios from "axios";
import "../../assets/styles/DetallesPedido.css";

const DetallesPedido = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productosConInfo, setProductosConInfo] = useState([]);
  const [comprobanteURL, setComprobanteURL] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/facturas/${id}/`);
        const { productos, comprobante } = response.data;

        const formateados = productos.map(p => ({
          nombre: p.nombre,
          cantidad: p.cantidad,
          precioUnitario: p.precio_unitario,
          precioTotal: p.cantidad * p.precio_unitario
        }));

        setProductosConInfo(formateados);
        setComprobanteURL(comprobante);
      } catch (error) {
        console.error("❌ Error al obtener detalles del pedido:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchPedido();
  }, [id]);

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

  if (cargando) return <p>Cargando detalles del pedido...</p>;

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


