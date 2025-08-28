import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TablaBase from "../../components/TablaBase";
import Boton from "../../components/Boton";
import axios from "axios";
import "../../assets/styles/HistorialPedido.css";

export default function HistorialPedidos() {
  const navigate = useNavigate();
  const columnas = ["Pedidos", "Hora y fecha", "Estado", "Detalles pedido", "Detalles cliente"];

  const [filtro, setFiltro] = useState("todos");
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const pedidosPorPagina = 5;

  const API_URL = import.meta.env.VITE_API_URL; // <-- variable de entorno

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const token = sessionStorage.getItem("access");
        if (!token) {
          setError("No estás autorizado. Por favor inicia sesión.");
          return;
        }

        const response = await axios.get(
          `${API_URL}/api/trabajador/historial-pedidos/`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const todosPedidos = [
          ...(response.data.aceptados || []).map(p => ({ ...p, estado: "aceptado" })),
          ...(response.data.rechazados || []).map(p => ({ ...p, estado: "rechazado" }))
        ];

        setPedidos(todosPedidos);

      } catch (error) {
        if (error.response) {
          setError(`Error ${error.response.status}: ${error.response.data.detail || "No autorizado"}`);
        } else if (error.request) {
          setError("No hubo respuesta del servidor.");
        } else {
          setError("Error al configurar la petición.");
        }
        setPedidos([]);
      }
    };

    fetchPedidos();
  }, [API_URL]);

  // Filtrar pedidos
  const pedidosFiltrados = pedidos.filter((pedido) => {
    if (filtro === "todos") return true;
    return (pedido.estado || "").toLowerCase() === filtro;
  });

  // Paginación
  const totalPaginas = Math.ceil(pedidosFiltrados.length / pedidosPorPagina);
  const indiceUltimoPedido = paginaActual * pedidosPorPagina;
  const indicePrimerPedido = indiceUltimoPedido - pedidosPorPagina;
  const pedidosPaginados = pedidosFiltrados.slice(indicePrimerPedido, indiceUltimoPedido);

  const datos = pedidosPaginados.map((pedido) => [
    pedido.id,
    pedido.fecha || "N/A",
    pedido.estado,
    <Boton texto="Ver pedido" onClick={() => navigate(`/DetallesPedido/${pedido.id}`)} />,
    <Boton texto="Detalles del cliente" onClick={() => navigate(`/InfoCliente/${pedido.id}`)} />
  ]);

  return (
    <div className="contenido" style={{ padding: "1rem" }}>
      <h2 className="titulo">Historial de pedidos</h2>

      {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}

      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem", justifyContent:"center" }}>
        <Boton texto="Todos" onClick={() => { setFiltro("todos"); setPaginaActual(1); }} />
        <Boton texto="Aceptados" onClick={() => { setFiltro("aceptado"); setPaginaActual(1); }} />
        <Boton texto="Rechazados" onClick={() => { setFiltro("rechazado"); setPaginaActual(1); }} />
      </div>

      <TablaBase columnas={columnas} datos={datos} />

      {/* Paginación */}
      <div className="paginacion">
        <button disabled={paginaActual === 1} onClick={() => setPaginaActual(paginaActual - 1)}>Anterior</button>
        {[...Array(totalPaginas)].map((_, i) => (
          <button
            key={i}
            className={paginaActual === i + 1 ? "activo" : ""}
            onClick={() => setPaginaActual(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button disabled={paginaActual === totalPaginas} onClick={() => setPaginaActual(paginaActual + 1)}>Siguiente</button>
      </div>

      <Boton texto="Volver" onClick={() => navigate('/Inicio')} tipo="boton-personalizado" />
    </div>
  );
}
