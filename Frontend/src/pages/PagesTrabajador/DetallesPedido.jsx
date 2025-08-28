import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TablaBase from "../../components/TablaBase";
import axios from "axios";
import "../../assets/styles/DetallesPedido.css";

const DetallesPedido = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productosConInfo, setProductosConInfo] = useState([]);
  const [comprobanteURL, setComprobanteURL] = useState(null);
  const [infoFactura, setInfoFactura] = useState({});
  const [cargando, setCargando] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL; // <-- variable de entorno

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const token = sessionStorage.getItem("access");
        const response = await axios.get(
          `${API_URL}/api/trabajador/facturas/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { productos, comprobante, ...infoRestante } = response.data;

        const formateados = productos.map((p) => ({
          nombre: p.nombre,
          cantidad: p.cantidad,
          precioUnitario: parseFloat(p.precio_unitario),
          precioTotal: p.subtotal,
        }));

        setProductosConInfo(formateados);
        setComprobanteURL(comprobante);
        setInfoFactura(infoRestante);
      } catch (error) {
        console.error("❌ Error al obtener detalles del pedido:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchPedido();
  }, [id, API_URL]);

  const columnas = ["Producto", "Cantidad", "Precio unitario", "Precio total"];

  const datosTabla = productosConInfo.map((p) => [
    p.nombre,
    p.cantidad,
    `$${p.precioUnitario.toLocaleString()}`,
    `$${p.precioTotal.toLocaleString()}`,
  ]);

  const totalGeneral = productosConInfo.reduce(
    (sum, p) => sum + p.precioTotal,
    0
  );

  if (cargando) return <p>Cargando detalles del pedido...</p>;

  return (
    <div className="contenedor-detalles">
      <h2 className="titulo-detalles">Detalles del pedido #{id}</h2>
      <TablaBase columnas={columnas} datos={datosTabla} />

      <div className="info-adicional">
        <h3 className="subtitulo-info">Información del pedido</h3>
        <div className="grid-info">
          <p>
            <span>Dirección de entrega:</span>{" "}
            {infoFactura.direccion_entrega || "No especificada"}
          </p>
          <p>
            <span>Fecha de entrega:</span>{" "}
            {infoFactura.fecha_entrega || "No especificada"}
          </p>
          <p>
            <span>Notas:</span> {infoFactura.notas || "Sin notas"}
          </p>
          <p>
            <span>Método de pago:</span> {infoFactura.metodo_pago}
          </p>
          <p>
            <span>Método de entrega:</span> {infoFactura.metodo_entrega}
          </p>
        </div>

        {comprobanteURL && (
          <div className="seccion-comprobante">
            <span>Comprobante:</span>
            <button
              className="boton-ver-comprobante"
              onClick={() => setModalVisible(true)}
            >
              Ver comprobante
            </button>
          </div>
        )}

        <div className="total-general">
          <span>Total:</span>
          <strong>${totalGeneral.toLocaleString()}</strong>
        </div>
      </div>

      {modalVisible && (
        <div
          className="modal-comprobante"
          onClick={() => setModalVisible(false)}
        >
          <img src={comprobanteURL} alt="Comprobante" />
        </div>
      )}

      <div className="contenedor-volver">
        <button className="boton-moderno-v-2" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default DetallesPedido;
