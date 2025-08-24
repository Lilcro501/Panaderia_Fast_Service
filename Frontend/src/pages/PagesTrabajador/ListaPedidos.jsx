import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TablaBase from "../../components/TablaBase";
import Boton from "../../components/Boton";
import "../../assets/styles/listas.css";
import axios from "axios";

const ListaPedidos = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [modal, setModal] = useState({ visible: false, tipo: "", pedidoId: null });
  const [motivo, setMotivo] = useState("");
  const [motivosSeleccionados, setMotivosSeleccionados] = useState([]);
  const [notificacion, setNotificacion] = useState({ visible: false, mensaje: "", tipo: "" });

  const [paginaActual, setPaginaActual] = useState(1);
  const pedidosPorPagina = 5;

  const opcionesMotivo = [
    "Pago incompleto",
    "Pedidos no disponibles",
    "Domicilio no disponible",
    "Fecha no disponible",
    "Dirección incorrecta",
    "Datos incorrectos"
  ];

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/trabajador/listar-pedidos/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        setPedidos(response.data);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
        mostrarNotificacion("Error al cargar pedidos", "error");
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

  // Paginación
  const totalPaginas = Math.ceil(pedidos.length / pedidosPorPagina);
  const indiceUltimoPedido = paginaActual * pedidosPorPagina;
  const indicePrimerPedido = indiceUltimoPedido - pedidosPorPagina;
  const pedidosPaginados = pedidos.slice(indicePrimerPedido, indiceUltimoPedido);

  const datos = pedidosPaginados.map((pedido) => [
    pedido.id,
    pedido.metodo_entrega,
    <Boton
      texto="Ver cliente"
      onClick={() => navigate(`/InfoCliente/${pedido.id}`)}
    />,
    pedido.estado || "Pagar",
    <Boton
      texto="Ver pedido"
      onClick={() => navigate(`/DetallesPedido/${pedido.id}`)}
    />,
    <div className="botones-acciones">
      <Boton
        texto="Aceptar"
        tipo="boton-aceptar"
        onClick={() => setModal({ visible: true, tipo: "aceptar", pedidoId: pedido.id })}
      />
      <Boton
        texto="Rechazar"
        tipo="boton-rechazar"
        onClick={() => setModal({ visible: true, tipo: "rechazar", pedidoId: pedido.id })}
      />
    </div>
  ]);

  const cerrarModal = () => {
    setModal({ visible: false, tipo: "", pedidoId: null });
    setMotivo("");
    setMotivosSeleccionados([]);
  };

  const manejarCheck = (motivoCheck) => {
    setMotivosSeleccionados((prev) =>
      prev.includes(motivoCheck)
        ? prev.filter((m) => m !== motivoCheck)
        : [...prev, motivoCheck]
    );
  };

  const mostrarNotificacion = (mensaje, tipo) => {
    setNotificacion({ visible: true, mensaje, tipo });
    setTimeout(() => {
      setNotificacion({ visible: false, mensaje: "", tipo: "" });
    }, 3000);
  };

  const manejarConfirmacion = async () => {
    if (modal.tipo === "rechazar" && motivosSeleccionados.length === 0 && !motivo.trim()) {
      mostrarNotificacion("Debes seleccionar al menos un motivo o escribir uno.", "error");
      return;
    }

    const motivoFinal = [...motivosSeleccionados, motivo.trim()].filter(Boolean).join("; ");

    cerrarModal();

    try {
      const payload = {
        id_pedido: modal.pedidoId,
        motivo: motivoFinal,
        accion: modal.tipo
      };

      await axios.post("http://localhost:8000/api/trabajador/notificar-pedido/", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      // Actualiza la lista de pedidos
      setPedidos((prevPedidos) => prevPedidos.filter(p => p.id !== modal.pedidoId));

      mostrarNotificacion(
        `Pedido ${modal.tipo === "aceptar" ? "aceptado y despachado" : "rechazado"} correctamente`,
        "exito"
      );
    } catch (error) {
      console.error("Error al procesar acción del pedido:", error);
      mostrarNotificacion("Ocurrió un error al procesar el pedido", "error");
    }
  };

  return (
    <div className="contenido">
      <h2 className="titulo">Lista de pedidos</h2>
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

      <div className="contenedor-volver">
        <Boton
          texto="Volver"
          onClick={() => navigate("/Inicio")}
          className="boton-volver"
        />
      </div>

      {/* Modal de confirmación */}
      {modal.visible && (
        <div className="modal-fondo">
          <div className="modal-contenido">
            <h3>{modal.tipo === "aceptar" ? "Confirmar Aceptación" : "Confirmar Rechazo"}</h3>
            <p>¿Estás seguro que deseas {modal.tipo === "aceptar" ? "aceptar" : "rechazar"} el pedido #{modal.pedidoId}?</p>

            {modal.tipo === "rechazar" && (
              <div className="motivos-rechazo">
                <p><strong>Selecciona motivos del rechazo:</strong></p>
                {opcionesMotivo.map((m, i) => (
                  <label key={i} style={{ display: "block", marginBottom: "5px" }}>
                    <input
                      type="checkbox"
                      checked={motivosSeleccionados.includes(m)}
                      onChange={() => manejarCheck(m)}
                    />{" "}
                    {m}
                  </label>
                ))}
              </div>
            )}

            <textarea
              placeholder={modal.tipo === "aceptar" ? "Motivo (opcional)" : "Motivo adicional (opcional)"}
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              rows={4}
            />

            <div className="modal-botones">
              <Boton texto="Cancelar" onClick={cerrarModal} />
              <Boton
                texto="Confirmar"
                onClick={manejarConfirmacion}
                tipo={modal.tipo === "aceptar" ? "boton-aceptar" : "boton-rechazar"}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal de notificación */}
      {notificacion.visible && (
        <div className={`modal-fondo modal-${notificacion.tipo}`}>
          <div className="modal-contenido">
            <p>{notificacion.mensaje}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaPedidos;
