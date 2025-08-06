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

  const manejarConfirmacion = async () => {
    if (modal.tipo === "rechazar" && motivosSeleccionados.length === 0 && !motivo.trim()) {
      alert("Debes seleccionar al menos un motivo o escribir uno.");
      return;
    }

    const motivoFinal = [...motivosSeleccionados, motivo.trim()].filter(Boolean).join("; ");

    try {
      const payload = {
        id_pedido: modal.pedidoId,
        motivo: motivoFinal,
        accion: modal.tipo
      };

      await axios.post("http://localhost:8000/api/notificar-pedido/", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert(`Pedido ${modal.tipo === "aceptar" ? "aceptado" : "rechazado"} correctamente`);
      cerrarModal();
    } catch (error) {
      console.error("Error al procesar acción del pedido:", error);
      alert("Ocurrió un error. Intenta nuevamente.");
    }
  };

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

      {/* Modal */}
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
              placeholder={
                modal.tipo === "aceptar"
                  ? "Motivo (opcional)"
                  : "Motivo adicional (opcional)"
              }
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
    </div>
  );
};
export default ListaPedidos;
