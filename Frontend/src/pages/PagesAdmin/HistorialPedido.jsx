import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/styles/HistorialPedido.css";

export default function HistorialPedido() {
    const [facturas, setFacturas] = useState([]);
    const [cargando, setCargando] = useState(true);

    // Estado para paginación
    const [paginaActual, setPaginaActual] = useState(1);
    const facturasPorPagina = 5; // ✅ Número de facturas por página

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

    // Calcular facturas a mostrar en la página actual
    const indiceUltimaFactura = paginaActual * facturasPorPagina;
    const indicePrimeraFactura = indiceUltimaFactura - facturasPorPagina;
    const facturasActuales = facturas.slice(indicePrimeraFactura, indiceUltimaFactura);

    // Número total de páginas
    const totalPaginas = Math.ceil(facturas.length / facturasPorPagina);

    // Cambiar página
    const cambiarPagina = (numero) => {
        if (numero >= 1 && numero <= totalPaginas) {
            setPaginaActual(numero);
        }
    };

    return (
        <div className="contenedor-pedidos">
            <div className="panel">
                <h3 className="titulo-panel">Historial de Facturas</h3>

                {cargando ? (
                    <p className="mensaje-vacio">Cargando facturas...</p>
                ) : facturas.length === 0 ? (
                    <p className="mensaje-vacio">No hay facturas registradas.</p>
                ) : (
                    <>
                        {facturasActuales.map((factura) => (
                            <div key={factura.id_factura} className="pedido-item">
                                <span className="icono-usuario">👤</span>
                                <span className="nombre-cliente">{factura.cliente}</span>
                                <span className="fecha-pedido">
                                    🕒 {new Date(factura.fecha).toLocaleString()}
                                </span>
                                <span className="total-pedido">💰 ${factura.total}</span>
                            </div>
                        ))}

                        {/* 🔹 Controles de paginación */}
                        <div className="paginacion">
                            <button
                                onClick={() => cambiarPagina(paginaActual - 1)}
                                disabled={paginaActual === 1}
                            >
                                ⬅ Anterior
                            </button>

                            <span>
                                Página {paginaActual} de {totalPaginas}
                            </span>

                            <button
                                onClick={() => cambiarPagina(paginaActual + 1)}
                                disabled={paginaActual === totalPaginas}
                            >
                                Siguiente ➡
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
