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
  const [infoFactura, setInfoFactura] = useState({});
  const [cargando, setCargando] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8000/api/trabajador/facturas/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const {
          productos,
          comprobante,
          ...infoRestante
        } = response.data;

        const formateados = productos.map(p => ({
          nombre: p.nombre,
          cantidad: p.cantidad,
          precioUnitario: parseFloat(p.precio_unitario),
          precioTotal: p.subtotal
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
  }, [id]);

  const columnas = ["Producto", "Cantidad", "Precio unitario", "Precio total"];

  const datosTabla = productosConInfo.map(p => [
    p.nombre,
    p.cantidad,
    `$${p.precioUnitario.toLocaleString()}`,
    `$${p.precioTotal.toLocaleString()}`
  ]);

  const totalGeneral = productosConInfo.reduce((sum, p) => sum + p.precioTotal, 0);

  if (cargando) return <p>Cargando detalles del pedido...</p>;

  return (
    <div className="contenedor-detalles">
      <h2 className="titulo-detalles">Detalles del pedido #{id}</h2>
      <TablaBase columnas={columnas} datos={datosTabla} />
      
      <div className="info-adicional">
        <h3>Información adicional</h3>
        <p><strong>Dirección de entrega:</strong> {infoFactura.direccion_entrega || "No especificada"}</p>
        <p><strong>Fecha de entrega:</strong> {infoFactura.fecha_entrega || "No especificada"}</p>
        <p><strong>Notas:</strong> {infoFactura.notas || "Sin notas"}</p>
        <p><strong>Método de pago:</strong> {infoFactura.metodo_pago}</p>
        <p><strong>Método de entrega:</strong> {infoFactura.metodo_entrega}</p>

        {comprobanteURL && (
          <div className="seccion-comprobante">
            <strong>Comprobante:</strong>
            <button
              className="boton-ver-comprobante"
              onClick={() => setModalVisible(true)}
              style={{
                marginLeft: "10px",
                padding: "6px 12px",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Ver comprobante
            </button>
          </div>
        )}
      </div>

      {modalVisible && (
        <div className="modal-comprobante" onClick={() => setModalVisible(false)} style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 9999
        }}>
          <img
            src={comprobanteURL}
            alt="Comprobante"
            style={{
              maxHeight: "80vh",
              maxWidth: "80vw",
              borderRadius: "10px",
              boxShadow: "0 0 10px white"
            }}
          />
        </div>
      )}

      <div className="contenedor-volver">
        <button className="boton-volver" onClick={() => navigate(-1)}>Volver</button>
      </div>
    </div>
  );
};

export default DetallesPedido;
