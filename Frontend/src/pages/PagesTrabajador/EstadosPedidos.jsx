
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TablaBase from "../../components/TablaBase";
import "../../assets/styles/EstadoPedido.css";
import Boton from "../../components/Boton";


const pedidosIniciales = [
  { id: "26263", fecha: "12:05:23 PM - 12/02/2025", estado: "recibido" },
  { id: "34562", fecha: "01:25:53 PM - 08/03/2025", estado: "en_proceso" },
  { id: "598941", fecha: "03:53:08 PM - 20/05/2025", estado: "despachado" },
  { id: "346757", fecha: "06:38:08 PM - 25/06/2025", estado: "recibido" },
];

const EstadosPedidos = () => {
  const [pedidos, setPedidos] = useState(pedidosIniciales);
  const navigate = useNavigate();

  const cambiarEstado = (index, nuevoEstado) => {
    const copia = [...pedidos];
    copia[index].estado = nuevoEstado;
    setPedidos(copia);
  };
  
  /* ~~~~~~ Simulación de los pedidos acorde a la pestaña ListaPedidos ~~~~~~ */
  const PedidosSimulacion = [ 
    { id: "26263", clienteId: "cliente1" },
    { id: "34562", clienteId: "cliente2" },
    { id: "598941", clienteId: "cliente3" },
    { id: "346757", clienteId: "cliente4"},
  ];

  const columnas = ["Código pedido", "Fecha", "Recibido", "En proceso", "Despachado",  "Detalles pedido", "Detalles cliente",""];
  
  const datos = pedidos.map((pedido, index) => {
    const p = PedidosSimulacion.find((sim) => sim.id === pedido.id);
    return [
      pedido.id,
      pedido.fecha,
      <span className={`estado-circulo ${pedido.estado === "recibido" ? "activo rojo" : "rojo"}`} onClick={() => cambiarEstado(index, "recibido")}></span>,
      <span className={`estado-circulo ${pedido.estado === "en_proceso" ? "activo amarillo" : "amarillo"}`} onClick={() => cambiarEstado(index, "en_proceso")} ></span>,
      <span className={`estado-circulo ${pedido.estado === "despachado" ? "activo verde" : "verde"}`} onClick={() => cambiarEstado(index, "despachado")} ></span>,
      <Boton texto="Ver pedido" onClick={() => navigate(`/DetallesPedido/${pedido.id}`)} />,
      <Boton texto="Detalles del cliente" onClick={() => navigate(`/InfoCliente/${p?.clienteId}`)} />,
      <Boton texto="Cancelar pedido" onClick={() => navigate(`/Inicio`)} />,
    ];
  });

  return (
    <div className="estados-body">
      <h2 className="titulo">Estados de pedidos</h2>
      <TablaBase columnas={columnas} datos={datos} />

      <div className="Volver">
        <button onClick={() => navigate('/Inicio')} className="boton-personalizado">
          Volver
        </button>
      </div>
    </div>
  );
};

export default EstadosPedidos;
