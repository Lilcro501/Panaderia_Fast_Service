import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TablaAdmin from '../../components/TablaAdmin';

import agregar_documento from '../../assets/images/agregar_documento.png';
import editar_documento from '../../assets/images/editar_documento.png';
import eliminar_documento from '../../assets/images/eliminar_documento.png';

import "../../assets/styles/AdministrarTrabajador.css";
import "../../assets/styles/Global.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdministrarTrabajadores() {
    const [filas, setFilas] = useState([]);

    // --- Paginación ---
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const trabajadoresPorPagina = 10;

    const [notificacion, setNotificacion] = useState({ visible: false, mensaje: "", tipo: "" });
    const [confirmacion, setConfirmacion] = useState({ visible: false, id: null });

    const mostrarNotificacion = (mensaje, tipo) => {
        setNotificacion({ visible: true, mensaje, tipo });
        setTimeout(() => setNotificacion({ visible: false, mensaje: "", tipo: "" }), 2000);
    };

    const encabezados = ['Correo', 'Nombre', 'Apellido', 'Teléfono', 'Acciones'];

    const obtenerTrabajadores = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/administrador/usuarios/trabajadores/`);
            const trabajadores = res.data;

            // --- Paginación ---
            const indiceUltimo = paginaActual * trabajadoresPorPagina;
            const indicePrimero = indiceUltimo - trabajadoresPorPagina;
            const trabajadoresActuales = trabajadores.slice(indicePrimero, indiceUltimo);

            const filasConvertidas = trabajadoresActuales.map(trabajador => ([
                trabajador.email,
                trabajador.nombre,
                trabajador.apellido,
                trabajador.telefono || '—',
                <div key={`acciones-${trabajador.id_usuario}`} className="acciones_tabla">
                    <Link to={`/EditarTrabajador/${trabajador.id_usuario}`}>
                        <img
                            src={editar_documento}
                            alt="Editar"
                            title="Editar trabajador"
                            className="icono_tabla"
                        />
                    </Link>
                    <button
                        onClick={() => setConfirmacion({ visible: true, id: trabajador.id_usuario })}
                        className="boton_eliminar_tabla"
                        title="Eliminar trabajador"
                    >
                        <img src={eliminar_documento} alt="Eliminar" className="icono_tabla"/>
                    </button>
                </div>
            ]));

            setFilas(filasConvertidas);
            setTotalPaginas(Math.ceil(trabajadores.length / trabajadoresPorPagina));
        } catch (error) {
            console.error('Error al obtener trabajadores:', error);
            mostrarNotificacion("❌ Error al cargar los trabajadores.", "error");
        }
    };

    const manejarEliminar = async () => {
        try {
            await axios.delete(`${API_URL}/api/administrador/usuarios/${confirmacion.id}/`);
            mostrarNotificacion("✅ Trabajador eliminado correctamente.", "exito");
            setConfirmacion({ visible: false, id: null });
            obtenerTrabajadores();
        } catch (error) {
            console.error("Error al eliminar trabajador:", error);
            mostrarNotificacion("❌ No se pudo eliminar el trabajador.", "error");
        }
    };

    const cambiarPagina = (numero) => {
        if (numero >= 1 && numero <= totalPaginas) {
            setPaginaActual(numero);
        }
    };

    useEffect(() => {
        obtenerTrabajadores();
    }, [paginaActual]);

    return (
        <div className="contenedor_principal">
            <h2 className="titulo">Administrar Trabajadores</h2>

            <TablaAdmin encabezados={encabezados} filas={filas} />

            <div className="iconos_acciones">
                <Link to='/AgregarTrabajador' title="Agregar nuevo trabajador">
                    <img src={agregar_documento} alt="Agregar" />
                </Link>
            </div>

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

            {/* Notificación */}
            {notificacion.visible && (
                <div className={`modal-fondo modal-${notificacion.tipo}`}>
                    <div className="modal-contenido">
                        <p>{notificacion.mensaje}</p>
                    </div>
                </div>
            )}

            {/* Confirmación eliminar */}
            {confirmacion.visible && (
                <div className="modal-fondo modal-confirmacion">
                    <div className="modal-contenido">
                        <p>¿Estás seguro de eliminar este trabajador?</p>
                        <div className="modal-botones">
                            <button onClick={manejarEliminar} className="btn-confirmar">Sí</button>
                            <button onClick={() => setConfirmacion({ visible: false, id: null })} className="btn-cancelar">No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
