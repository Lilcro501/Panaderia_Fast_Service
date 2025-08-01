import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TablaBase from "../../components/TablaBase";
import Boton from "../../components/Boton";
import "../../assets/styles/listas.css";
import axios from "axios";

const ListaPedidos = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/listar-pedidos/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPedidos(response.data);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      }
    };

    fetchPedidos();
  }, []);

  const columnas = [
    "ID Pedido",
    "Método Entrega",
    "Cliente",
    "Estado",
    "Ver Pedido",
    "Acciones"
  ];

  const datos = pedidos.map((pedido) => [
    pedido.id,
    pedido.metodo_entrega,
    <Boton texto="Ver cliente" onClick={() => navigate(`/InfoCliente/${pedido.clienteId}`)} />,
    pedido.estado || "Pagar",
    <Boton
      texto="Ver pedido"
      onClick={() => navigate(`/DetallesPedido/${pedido.id}`)}
    />,
    <div className="botones-acciones">
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
  ]);

  return (
    <div className="contenido">
      <h2 className="titulo">Lista de pedidos</h2>
      <TablaBase columnas={columnas} datos={datos} />
      <div className="contenedor-volver">
        <Boton
          texto="Volver"
          onClick={() => navigate("/Inicio")}
          className="boton-volver"
        />
      </div>
    </div>
  );
};

export default ListaPedidos;
