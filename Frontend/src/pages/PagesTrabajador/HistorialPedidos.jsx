import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TablaBase from "../../components/TablaBase";
import Boton from "../../components/Boton";
import axios from "axios";

export default function HistorialPedidos() {
  const navigate = useNavigate();
  const columnas = ["Pedidos", "Cliente", "Hora y fecha", "Estado", "Detalles pedido", "Detalles cliente"];

  const [filtro, setFiltro] = useState("todos");
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
  const fetchPedidos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/trabajador/historial-pedidos/");
      console.log("📦 Datos recibidos:", response.data);

      // Combina ambos arrays en uno solo
      const todosPedidos = [
        ...response.data.aceptados.map(p => ({ ...p, estado: "aceptado" })),
        ...response.data.rechazados.map(p => ({ ...p, estado: "rechazado" }))
      ];

      setPedidos(todosPedidos);

    } catch (error) {
      console.error("Error al obtener historial de pedidos:", error);
      setPedidos([]);
    }
  };

  fetchPedidos();
}, []);


  const pedidosFiltrados = pedidos.filter((pedido) => {
    if (filtro === "todos") return true;
    return (pedido.estado || "").toLowerCase() === filtro;
  });

  const datos = pedidosFiltrados.map((pedido) => [
    pedido.id,
    pedido.cliente,
    pedido.fecha,
    pedido.estado,
    <Boton texto="Ver pedido" onClick={() => navigate(`/DetallesPedido/${pedido.id}`)} />,
    <Boton texto="Detalles del cliente" onClick={() => navigate(`/InfoCliente/${pedido.id}`)} />
  ]);

  return (
    <div className="contenido">
      <h2 className="titulo">Historial de pedidos</h2>

      {/* Filtro de estado */}
      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <Boton texto="Todos" onClick={() => setFiltro("todos")} />
        <Boton texto="Aceptados" onClick={() => setFiltro("aceptado")} />
        <Boton texto="Rechazados" onClick={() => setFiltro("rechazado")} />
      </div>

      <TablaBase columnas={columnas} datos={datos} />

      <Boton texto="Volver" onClick={() => navigate('/Inicio')} tipo="boton-personalizado" />
    </div>
  );
}
