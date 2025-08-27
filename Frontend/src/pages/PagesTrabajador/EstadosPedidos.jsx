import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TablaBase from "../../components/TablaBase";
import "../../assets/styles/estadospedido.css"

import Boton from "../../components/Boton";
import axios from "axios";  

const EstadosPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [notificacion, setNotificacion] = useState({
    visible: false,
    mensaje: "",
    tipo: "",
  });

  const [modalConfirmacion, setModalConfirmacion] = useState({
    visible: false,
    idFactura: null,
  });

  // 🔥 Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const pedidosPorPagina = 5;

  const navigate = useNavigate();

  const cargarEstadosLocales = () => {
    const estadosGuardados = sessionStorage.getItem("estadosPedidos");
    return estadosGuardados ? JSON.parse(estadosGuardados) : {};
  };

  const [estadosLocales, setEstadosLocales] = useState(cargarEstadosLocales);

  useEffect(() => {
    sessionStorage.setItem("estadosPedidos", JSON.stringify(estadosLocales));
  }, [estadosLocales]);

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const token = sessionStorage.getItem("access");
        const response = await axios.get(
          "http://localhost:8000/api/trabajador/estados-pedidos/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const pedidosConEstado = response.data.map((pedido) => {
          const estadoLocal = estadosLocales[pedido.id];
          return estadoLocal ? { ...pedido, proceso_pedido: estadoLocal } : pedido;
        });

        // 🔥 Filtrar los pedidos completados
        setPedidos(pedidosConEstado.filter((p) => p.proceso_pedido !== "completado"));
        setPaginaActual(1); // reset a primera página
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
        mostrarNotificacion("Error al cargar pedidos", "error");
      }
    };

    obtenerPedidos();
  }, [estadosLocales]);

  const mostrarNotificacion = (mensaje, tipo) => {
    setNotificacion({ visible: true, mensaje, tipo });
    setTimeout(() => {
      setNotificacion({ visible: false, mensaje: "", tipo: "" });
    }, 2000);
  };

  const cambiarEstado = async (idFactura, nuevoProceso) => {
    try {
      const token = sessionStorage.getItem("access");

      await axios.post(
        "http://localhost:8000/api/trabajador/actualizar-estado/",
        { id_factura: idFactura, proceso_pedido: nuevoProceso },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEstadosLocales((prev) => ({ ...prev, [idFactura]: nuevoProceso }));

      setPedidos((prevPedidos) =>
        nuevoProceso === "completado"
          ? prevPedidos.filter((pedido) => pedido.id !== idFactura)
          : prevPedidos.map((pedido) =>
              pedido.id === idFactura
                ? { ...pedido, proceso_pedido: nuevoProceso }
                : pedido
            )
      );

      mostrarNotificacion("Estado actualizado", "exito");
    } catch (error) {
      console.error("Error al actualizar estado:", error.response?.data || error);
      mostrarNotificacion("Error al actualizar estado", "error");
    }
  };

  const columnas = [
    "Código pedido",
    "Fecha",
    "Preparando",
    "Empaquetando",
    "En entrega",
    "Detalles pedido",
    "Completado",
  ];

  // 🔥 Lógica de paginado
  const indiceUltimo = paginaActual * pedidosPorPagina;
  const indicePrimero = indiceUltimo - pedidosPorPagina;
  const pedidosPaginados = pedidos.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(pedidos.length / pedidosPorPagina);

  const datos = pedidosPaginados.map((pedido) => [
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
    <Boton
      texto="Ver pedido"
      onClick={() => navigate(`/DetallesPedido/${pedido.id}`)}
    />,
    <button
      className={`boton-completado ${
        pedido.proceso_pedido === "completado" ? "activo" : ""
      }`}
      onClick={() =>
        setModalConfirmacion({ visible: true, idFactura: pedido.id })
      }
    >
      Completado
    </button>,
  ]);

  return (
    <div className="estados-body">
      <h2 className="titulo">Estados de pedidos</h2>
      <TablaBase columnas={columnas} datos={datos} />

      {/* 🔥 Controles de paginación */}
      <div className="paginacion">
        <button
          className="boton-navegacion boton-anterior"
          disabled={paginaActual === 1}
          onClick={() => setPaginaActual(paginaActual - 1)}
        >
          ⬅ Anterior
        </button>
        <span style={{color:"white"}}>
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          className="boton-navegacion"
          disabled={paginaActual === totalPaginas}
          onClick={() => setPaginaActual(paginaActual + 1)}
        >
          Siguiente ➡
        </button>
      </div>

      <div className="Volver">
        <button
          onClick={() => navigate("/Inicio")}
          className="boton-personalizado"
        >
          Volver
        </button>
      </div>

      {/* Modal de notificación */}
      {notificacion.visible && (
        <div className={`modal-fondo modal-${notificacion.tipo}`}>
          <div className="modal-contenido">
            <p>{notificacion.mensaje}</p>
          </div>
        </div>
      )}

      {/* Modal de confirmación completado */}
      {modalConfirmacion.visible && (
        <div className="modal-fondo">
          <div className="modal-contenido">
            <p>¿Pedido completado?</p>
            <div className="modal-botones">
              <button
                className="boton-cancelar"
                onClick={() =>
                  setModalConfirmacion({ visible: false, idFactura: null })
                }
              >
                Cancelar
              </button>
              <button
                className="boton-aceptar"
                onClick={() => {
                  cambiarEstado(modalConfirmacion.idFactura, "completado");
                  setModalConfirmacion({ visible: false, idFactura: null });
                }}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EstadosPedidos;
