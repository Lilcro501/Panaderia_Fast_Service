import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TablaBase from "../../components/TablaBase";
import "../../assets/styles/EstadoPedido.css";
import Boton from "../../components/Boton";
import axios from "axios";

const EstadosPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  // Cargar los estados guardados en localStorage
  const cargarEstadosLocales = () => {
    const estadosGuardados = localStorage.getItem("estadosPedidos");
    return estadosGuardados ? JSON.parse(estadosGuardados) : {};
  };

  const [estadosLocales, setEstadosLocales] = useState(cargarEstadosLocales);

  // Guardar en localStorage cada vez que cambia el estado local
  useEffect(() => {
    localStorage.setItem("estadosPedidos", JSON.stringify(estadosLocales));
  }, [estadosLocales]);

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/trabajador/estados-pedidos/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Aplicar estados locales si existen
        const pedidosConEstado = response.data.map((pedido) => {
          const estadoLocal = estadosLocales[pedido.id];
          return estadoLocal ? { ...pedido, proceso_pedido: estadoLocal } : pedido;
        });

        setPedidos(pedidosConEstado);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      }
    };

    obtenerPedidos();
  }, [estadosLocales]); // <-- también depende de estadosLocales

  const cambiarEstado = async (idFactura, nuevoProceso) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/api/trabajador/actualizar-estado/",
        {
          id_factura: idFactura,
          proceso_pedido: nuevoProceso,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Estado actualizado a:", nuevoProceso);

      // Actualizar estado en localStorage y estado React
      setEstadosLocales((prev) => ({
        ...prev,
        [idFactura]: nuevoProceso,
      }));

      setPedidos((prevPedidos) =>
        prevPedidos.map((pedido) =>
          pedido.id === idFactura ? { ...pedido, proceso_pedido: nuevoProceso } : pedido
        )
      );
    } catch (error) {
      console.error("Error al actualizar estado:", error.response?.data || error);
    }
  };

  const columnas = [
    "Código pedido",
    "Fecha",
    "Preparando",
    "Empaquetando",
    "En entrega",
    "Detalles pedido",
    "Detalles cliente",
  ];

  const datos = pedidos.map((pedido) => [
    pedido.id,
    pedido.fecha,

    <span
      className={`estado-circulo ${
        pedido.proceso_pedido === "preparando" ? "activo rojo" : "rojo"
      }`}
      onClick={() => cambiarEstado(pedido.id, "preparando")}
      title="Preparando"
    ></span>,

    <span
      className={`estado-circulo ${
        pedido.proceso_pedido === "empaquetando" ? "activo amarillo" : "amarillo"
      }`}
      onClick={() => cambiarEstado(pedido.id, "empaquetando")}
      title="Empaquetando"
    ></span>,

    <span
      className={`estado-circulo ${
        pedido.proceso_pedido === "en entrega" ? "activo verde" : "verde"
      }`}
      onClick={() => cambiarEstado(pedido.id, "en entrega")}
      title="En entrega"
    ></span>,

    <Boton texto="Ver pedido" onClick={() => navigate(`/DetallesPedido/${pedido.id}`)} />,
    <Boton texto="Detalles del cliente" onClick={() => navigate(`/InfoCliente/${pedido.cliente_id}`)} />,
  ]);

  return (
    <div className="estados-body">
      <h2 className="titulo">Estados de pedidos</h2>
      <TablaBase columnas={columnas} datos={datos} />

      <div className="Volver">
        <button onClick={() => navigate("/Inicio")} className="boton-personalizado">
          Volver
        </button>
      </div>
    </div>
  );
};

export default EstadosPedidos;

