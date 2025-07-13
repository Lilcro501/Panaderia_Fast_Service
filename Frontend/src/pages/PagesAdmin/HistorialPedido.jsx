import React, { useState } from "react";
//~~~~~~~~~~~~~~ Estilo ~~~~~~~~~~~~~~
import "../../assets/styles/HistorialPedido.css";

/**
    * Página de pedidos
    * 
    * - Muestra pedidos pendientes (botones aceptar y rechazar)
    * - Muestra pedidos rechazados
    * - Con lógica básica de React (useState)
*/

export default function HistorialPedido() {
    // Estado inicial de pedidos pendientes
    const [pendientes, setPendientes] = useState([
        { id: 1, cliente: "Juan Pérez" },
        { id: 2, cliente: "Ana López" },
        { id: 3, cliente: "Carlos Ruiz" }
    ]);

    // Estado inicial de pedidos rechazados
    const [rechazados, setRechazados] = useState([]);

    /**
    * Acción para rechazar un pedido
    * - Lo quita de pendientes
    * - Lo agrega a rechazados
    */
    const rechazarPedido = (id) => {
        // Buscar el pedido en la lista de pendientes
        const pedido = pendientes.find(p => p.id === id);
        if (pedido) {
            // Agregarlo a rechazados
            setRechazados([...rechazados, pedido]);
            // Quitarlo de pendientes
            setPendientes(pendientes.filter(p => p.id !== id));
        }
    };

    /**
     * Acción para aceptar un pedido
     * - Lo quita de pendientes
     * - Aquí podrías llamar al backend para confirmarlo
     */
    const aceptarPedido = (id) => {
        // Simulamos aceptar simplemente eliminándolo de pendientes
        setPendientes(pendientes.filter(p => p.id !== id));
        console.log("Pedido aceptado:", id);

        // Aquí podrías hacer:
        // fetch('/api/aceptar-pedido', { method: 'POST', body: JSON.stringify({ id }) })
    };

    return (
        <div className="contenedor-pedidos">
            {/* PANEL: Aceptar pedido */}
            <div className="panel">
                <h3 className="titulo-panel">Aceptar pedido</h3>
                {/* Mapeamos los pedidos pendientes */}
                {pendientes.length === 0 ? (
                    <p className="mensaje-vacio">No hay pedidos pendientes.</p>
                ) : (
                    pendientes.map(pedido => (
                        <div key={pedido.id} className="pedido-item">
                            <span className="icono-usuario">👤</span>
                            <span className="nombre-cliente">{pedido.cliente}</span>
                            {/* Botón rechazar */}
                            <button className="btn-accion btn-rechazar" onClick={() => rechazarPedido(pedido.id)}>
                                ❌
                            </button>
                            {/* Botón aceptar */}
                            <button className="btn-accion btn-aceptar" onClick={() => aceptarPedido(pedido.id)}>
                                ✔️
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* PANEL: Pedidos rechazados */}
            <div className="panel">
                <h3 className="titulo-panel">Pedidos rechazados</h3>

                {/* Mapeamos los pedidos rechazados */}
                {rechazados.length === 0 ? (
                    <p className="mensaje-vacio">No hay pedidos rechazados.</p>
                ) : (
                    rechazados.map(pedido => (
                        <div key={pedido.id} className="pedido-item">
                            <span className="icono-usuario">👤</span>
                            <span className="nombre-cliente">{pedido.cliente}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
