import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TablaBase from "../../components/TablaBase";
import Boton from "../../components/Boton";
import { obtenerPedidosPorFactura } from "../../api/pedidos";
import "../../assets/styles/listas.css";

const ListaPedidos = () => {
  const navigate = useNavigate();
  const { idFactura } = useParams();
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        setCargando(true);
        const data = await obtenerPedidosPorFactura(idFactura);
        console.log("Pedidos cargados:", data);
        setPedidos(data);
      } catch (err) {
        console.error("Error cargando pedidos:", err);
        setError("Error al cargar los pedidos");
      } finally {
        setCargando(false);
      }
    };

    if (idFactura) {
      cargarPedidos();
    }
  }, [idFactura]);

  const columnas = ["ID Pedido", "Acciones"];

  const datos = pedidos.map((pedido) => ({
    key: pedido.id,
    rowData: [
      pedido.id,
      <div className="botones-acciones">
        <Boton
          texto="Ver Detalles"
          onClick={() => navigate(`/pedidos/${pedido.id}`)}
          tipo="boton-ver"
        />
        <Boton
          texto="Aceptar"
          onClick={() => alert(`Pedido ${pedido.id} aceptado`)}
          tipo="boton-aceptar"
        />
        <Boton
          texto="Rechazar"
          onClick={() => alert(`Pedido ${pedido.id} rechazado`)}
          tipo="boton-rechazar"
        />
      </div>
    ]
  }));

  if (cargando) return <div>Cargando pedidos...</div>;
  if (error) return <div className="error">{error}</div>;
  if (pedidos.length === 0) return <div>No hay pedidos para esta factura</div>;

  return (
    <div className="contenido">
      <h2 className="titulo">Pedidos de la Factura #{idFactura}</h2>
      <TablaBase columnas={columnas} datos={datos.map(d => d.rowData)} />
      <Boton 
        texto="Volver a Facturas" 
        onClick={() => navigate("/facturas")} 
        className="boton-volver" 
      />
    </div>
  );
};

export default ListaPedidos;
