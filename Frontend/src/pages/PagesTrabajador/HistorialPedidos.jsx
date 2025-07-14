
import React from "react"; 

import { useNavigate } from "react-router-dom";
import TablaBase from "../../components/TablaBase";
import Boton from "../../components/Boton";


export default function HistorialPedidos() {
  const navigate = useNavigate();

  const columnas = ["Pedidos", "Cliente", "Hora y fecha", "Detalles pedido", "Detalles cliente"];

    /* ~~~~~~ Simulación de los pedidos acorde a la pestaña ListaPedidos ~~~~~~ */
    const pedidos = [
    { id: "26263", cliente: "Camila  Pérez", fecha: "12:05:23 PM - 12/02/2025", clienteId: "cliente1" },
    { id: "34562", cliente: "Juan García", fecha: "01:25:53 PM - 08/03/2025", clienteId: "cliente2" },
    { id: "598941", cliente: "Laura Ríos", fecha: "03:53:08 PM - 20/05/2025", clienteId: "cliente3" },
    { id: "346757", cliente: "Pedro Torres", fecha: "06:38:08 PM - 25/06/2025", clienteId: "cliente4" },
  ];

  const datos = pedidos.map((pedido) => [
    pedido.id,
    pedido.cliente,
    pedido.fecha,
    <Boton texto="Ver pedido" onClick={() => navigate(`/DetallesPedido/${pedido.id}`)} />,
    <Boton texto="Detalles del cliente" onClick={() => navigate(`/InfoCliente/${pedido.clienteId}`)} />
  ]);
  
  return (
    <div className="contenido">
      <h2 className="titulo">Historial de pedidos</h2>
      <TablaBase columnas={columnas} datos={datos} />

      {/* Botón para volver al menú principal */}
      <Boton texto="Volver" onClick={() => navigate('/Inicio')} tipo="boton-personalizado" />
      
    </div>
  );
}
