import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TablaBase from "../../components/TablaBase";
import "../../assets/styles/EstadoPedido.css";

const pedidosIniciales = [
  { id: "26263", fecha: "12:05:23 PM - 12/02/2025", estado: "recibido" },
  { id: "34562", fecha: "01:25:53 PM - 08/03/2025", estado: "en_proceso" },
  { id: "598941", fecha: "03:53:08 PM - 20/05/2025", estado: "despachado" },
  { id: "347657", fecha: "06:38:08 PM - 25/06/2025", estado: "recibido" },
];

const EstadosPedidos = () => {
  const [pedidos, setPedidos] = useState(pedidosIniciales);
  const navigate = useNavigate();

  const cambiarEstado = (index, nuevoEstado) => {
    const copia = [...pedidos];
    copia[index].estado = nuevoEstado;
    setPedidos(copia);
  };

  const columnas = ["Pedido", "Fecha", "Recibido", "En proceso", "Despachado"];
  const datos = pedidos.map((pedido, index) => [
    pedido.id,
    pedido.fecha,
    <span className={`estado-circulo ${pedido.estado === "recibido" ? "activo rojo" : "rojo"}`} onClick={() => cambiarEstado(index, "recibido")}></span>,
    <span className={`estado-circulo ${pedido.estado === "en_proceso" ? "activo amarillo" : "amarillo"}`} onClick={() => cambiarEstado(index, "en_proceso")}></span>,
    <span className={`estado-circulo ${pedido.estado === "despachado" ? "activo verde" : "verde"}`} onClick={() => cambiarEstado(index, "despachado")}></span>
  ]);

  return (
    <div className="estados-body">
      <h2 className="titulo">Estados de pedidos</h2>
      <TablaBase columnas={columnas} datos={datos} />

      <div className="boton-volver">
        <button onClick={() => navigate('/Inicio')} className="boton-personalizado">
          Volver
        </button>
      </div>
    </div>
  );
};

export default EstadosPedidos;
