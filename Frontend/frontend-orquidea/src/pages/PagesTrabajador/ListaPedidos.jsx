import React from "react";
import { useNavigate } from "react-router-dom";
import TablaBase from "../../components/TablaBase";
import Boton from "../../components/Boton";
import "../../assets/styles/listas.css";

const ListaPedidos = () => {
  const navigate = useNavigate();

  const pedidos = [
    { id: "26263", clienteId: "cliente1" },
    { id: "34562", clienteId: "cliente2" },
    { id: "598941", clienteId: "cliente3" },
    { id: "346757", clienteId: "cliente4" },
  ];

  const columnas = ["Pedidos", "Detalle del pedido", "Cliente", "Acciones"];

  const datos = pedidos.map((pedido) => [
    pedido.id,
    <Boton texto="Ver pedido" onClick={() => navigate('/DetallesPedido/${pedido.id}')} />,
    <Boton texto="Detalles del cliente" onClick={() => navigate('/InfoCliente/${pedido.clienteId}')} />,
    <div className="botones-acciones">
      <Boton texto="Aceptar" onClick={() => alert(`Pedido ${pedido.id} aceptado`)} tipo="boton-aceptar" />
      <Boton texto="Rechazar" onClick={() => alert(`Pedido ${pedido.id} rechazado`)} tipo="boton-rechazar" />
    </div>
  ]);

  return (
    <div>
      <h2 className="titulo">Lista de pedidos</h2>
      <TablaBase columnas={columnas} datos={datos} />

      <Boton texto="Volver" onClick={() => navigate('/Inicio')} tipo="" className='boton-volver' />
    </div>
  );
};

export default ListaPedidos;
