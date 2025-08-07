import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/styles/HistorialPedido.css";

export default function HistorialPedido() {
    const [facturas, setFacturas] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/administrador/facturas/")
            .then((res) => {
                setFacturas(res.data);
                setCargando(false);
            })
            .catch((err) => {
                console.error("Error al obtener las facturas:", err);
                setCargando(false);
            });
    }, []);

    return (
        <div className="contenedor-pedidos">
            <div className="panel">
                <h3 className="titulo-panel">Historial de Facturas</h3>

                {cargando ? (
                    <p className="mensaje-vacio">Cargando facturas...</p>
                ) : facturas.length === 0 ? (
                    <p className="mensaje-vacio">No hay facturas registradas.</p>
                ) : (
                    facturas.map((factura) => (
                        <div key={factura.id_factura} className="pedido-item">
                            <span className="icono-usuario">👤</span>
                            <span className="nombre-cliente">{factura.cliente}</span>
                            <span className="fecha-pedido">
                                🕒 {new Date(factura.fecha).toLocaleString()}
                            </span>
                            <span className="total-pedido">💰 ${factura.total}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
