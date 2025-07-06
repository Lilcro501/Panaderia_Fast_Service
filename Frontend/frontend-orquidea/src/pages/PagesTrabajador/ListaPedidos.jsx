// ListaPedidos.jsx
import React from "react";
import TablaBase from "../../components/TablaBase";
import Boton from "../../components/Boton";
import "../../assets/styles/listas.css"


const ListaPedidos = () => {
  // Columnas que se ven en la tabla
  const columnas = ["Pedidos", "Detalle del pedido", "Cliente"];

  // Datos falsos simulando los pedidos
  const datos = [
    ["26263", <Boton texto="Ver pedido ▼" />, <Boton texto="Detalles del cliente ▼" />],
    ["34562", <Boton texto="Ver pedido ▼" />, <Boton texto="Detalles del cliente ▼" />],
    ["598941", <Boton texto="Ver pedido ▼" />, <Boton texto="Detalles del cliente ▼" />],
    ["346757", <Boton texto="Ver pedido ▼" />, <Boton texto="Detalles del cliente ▼" />],
  ];

  return (
    <div className="contenedor-lista">
      {/* Título centrado */}
      <h2 className="titulo">LISTAS DE PEDIDOS</h2>
      <TablaBase columnas={columnas} datos={datos} />
    </div>
  );
};

export default ListaPedidos;
