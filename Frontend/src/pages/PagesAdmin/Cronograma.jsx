import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TablaAdmin from '../../components/TablaAdmin';

import agregar_documento from '../../assets/images/agregar_documento.png';
import editar_documento from '../../assets/images/editar_documento.png';
import eliminar_documento from '../../assets/images/eliminar_documento.png';

import "../../assets/styles/Global.css";

export default function Cronograma() {
    const encabezados = ['Nombre trabajador', 'Cargo', 'Actividades', 'Horarios', 'Fecha', 'Acciones'];
    const [filas, setFilas] = useState([]);

    // --- Paginación ---
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const cronogramasPorPagina = 10;

    // Estado de notificación
    const [notificacion, setNotificacion] = useState({
        visible: false,
        mensaje: "",
        tipo: ""
    });

    // Estado del modal de confirmación
    const [confirmacion, setConfirmacion] = useState({
        visible: false,
        mensaje: "",
        onConfirm: null
    });

    const mostrarNotificacion = (mensaje, tipo) => {
        setNotificacion({ visible: true, mensaje, tipo });
        setTimeout(() => setNotificacion({ visible: false, mensaje: "", tipo: "" }), 2000);
    };

    const pedirConfirmacion = (mensaje, onConfirm) => {
        setConfirmacion({ visible: true, mensaje, onConfirm });
    };

    const obtenerCronogramas = () => {
        axios.get('http://localhost:8000/api/administrador/cronograma/trabajadores/')
            .then(response => {
                const cronogramas = response.data;

                // --- Paginación ---
                const indiceUltimo = paginaActual * cronogramasPorPagina;
                const indicePrimero = indiceUltimo - cronogramasPorPagina;
                const cronogramasActuales = cronogramas.slice(indicePrimero, indiceUltimo);

                const filasConvertidas = cronogramasActuales.map(item => {
                    const usuario = item.usuario_detalle || {};
                    const nombreCompleto = `${usuario.nombre || ''} ${usuario.apellido || ''}`;
                    const horario = `${item.hora_inicio} - ${item.hora_fin}`;
                    const fecha = item.fecha;

                    return [
                        nombreCompleto,
                        item.titulo || '—',
                        item.descripcion || '—',
                        horario,
                        fecha,
                        <div key={`acciones-${item.id_cronograma}`} className="acciones_tabla">
                            <Link to={`/EditarCrono/${item.id_cronograma}`}>
                                <img
                                    src={editar_documento}
                                    alt="Editar"
                                    title="Editar cronograma"
                                    className="icono_tabla"
                                />
                            </Link>
                            <button
                                onClick={() => pedirConfirmacion(
                                    "¿Estás seguro de eliminar este cronograma?",
                                    () => manejarEliminar(item.id_cronograma)
                                )}
                                className="boton_eliminar_tabla"
                                title="Eliminar cronograma"
                            >
                                <img
                                    src={eliminar_documento}
                                    alt="Eliminar"
                                    className="icono_tabla"
                                />
                            </button>
                        </div>
                    ];
                });

                setFilas(filasConvertidas);
                setTotalPaginas(Math.ceil(cronogramas.length / cronogramasPorPagina));
            })
            .catch(error => {
                console.error("Error al cargar cronogramas de trabajadores:", error);
                mostrarNotificacion("❌ Error al cargar los cronogramas.", "error");
            });
    };

    const manejarEliminar = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/administrador/cronograma/${id}/`);
            mostrarNotificacion("✅ Cronograma eliminado correctamente.", "exito");
            obtenerCronogramas();
        } catch (error) {
            console.error("Error al eliminar cronograma:", error);
            mostrarNotificacion("❌ No se pudo eliminar el cronograma.", "error");
        } finally {
            setConfirmacion({ visible: false, mensaje: "", onConfirm: null });
        }
    };

    const cambiarPagina = (numero) => {
        if (numero >= 1 && numero <= totalPaginas) {
            setPaginaActual(numero);
        }
    };

    useEffect(() => {
        obtenerCronogramas();
    }, [paginaActual]);

    return (
        <>
            <div>
                <h1 className="titulo">Cronograma Trabajadores</h1>
                <TablaAdmin encabezados={encabezados} filas={filas} />
                
                {/* Paginación */}
                <div className="paginacion">
                    <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
                        Anterior
                    </button>

                    {[...Array(totalPaginas)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => cambiarPagina(index + 1)}
                            className={paginaActual === index + 1 ? 'activo' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
                        Siguiente
                    </button>
                </div>

                <br />
            </div>

            <div className='iconos_acciones'>
                <Link to='/AgregarCrono'>
                    <img src={agregar_documento} alt="Agregar" />
                </Link>
            </div>

            {/* Notificación */}
            {notificacion.visible && (
                <div className={`modal-fondo modal-${notificacion.tipo}`}>
                    <div className="modal-contenido">
                        <p>{notificacion.mensaje}</p>
                    </div>
                </div>
            )}

            {/* Modal Confirmación */}
            {confirmacion.visible && (
                <div className="modal-fondo">
                    <div className="modal-contenido">
                        <p>{confirmacion.mensaje}</p>
                        <div style={{ marginTop: "15px" }}>
                            <button onClick={confirmacion.onConfirm} className="btn-confirmar">Sí</button>
                            <button onClick={() => setConfirmacion({ visible: false, mensaje: "", onConfirm: null })} className="btn-cancelar">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
