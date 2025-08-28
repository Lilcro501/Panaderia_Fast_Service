import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import '../../assets/styles/AdministrarInven.css';
import "../../assets/styles/Global.css";

import CategoriasAdmin from "../../components/CategoriasAdmin";
import TablaAdmin from '../../components/TablaAdmin';

import agregar_documento from '../../assets/images/agregar_documento.png';
import editar_documento from '../../assets/images/editar_documento.png';
import eliminar_documento from '../../assets/images/eliminar_documento.png';

const API_URL = import.meta.env.VITE_API_URL;

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function AdministrarInven() {
    const [filas, setFilas] = useState([]);
    const [notificacion, setNotificacion] = useState({ visible: false, mensaje: "", tipo: "" });
    const [confirmacion, setConfirmacion] = useState({ visible: false, id: null });

    // --- Paginación ---
    const [paginaActual, setPaginaActual] = useState(1);
    const productosPorPagina = 10;
    const [totalPaginas, setTotalPaginas] = useState(1);

    const mostrarNotificacion = (mensaje, tipo) => {
        setNotificacion({ visible: true, mensaje, tipo });
        setTimeout(() => setNotificacion({ visible: false, mensaje: "", tipo: "" }), 2000);
    };

    const query = useQuery();
    const categoriaSeleccionada = query.get("categoria");

    const encabezados = ['ID','Nombre','Precio','Stock','Fecha Vencimiento','Acciones'];

    const obtenerProductos = async () => {
        try {
            let res = await axios.get(`${API_URL}/api/administrador/productos/`);
            let productos = res.data;

            if (categoriaSeleccionada) {
                productos = productos.filter(
                    p => p.id_categoria?.nombre?.toLowerCase() === categoriaSeleccionada.toLowerCase()
                );
            }

            // --- Paginación ---
            const indiceUltimo = paginaActual * productosPorPagina;
            const indicePrimero = indiceUltimo - productosPorPagina;
            const productosActuales = productos.slice(indicePrimero, indiceUltimo);

            const filasConvertidas = productosActuales.map(producto => ([
                producto.id_producto,
                producto.nombre,
                `$${parseFloat(producto.precio).toLocaleString()}`,
                producto.stock,
                producto.fecha_vencimiento || 'N/A',
                <div key={`acciones-${producto.id_producto}`} className="acciones_tabla">
                    <Link to={`/EditarInven/${producto.id_producto}`}>
                        <img src={editar_documento} alt="Editar" title="Editar producto" className="icono_tabla"/>
                    </Link>
                    <button 
                        onClick={() => setConfirmacion({ visible: true, id: producto.id_producto })} 
                        className="boton_eliminar_tabla" 
                        title="Eliminar producto"
                    >
                        <img src={eliminar_documento} alt="Eliminar" className="icono_tabla"/>
                    </button>
                </div>
            ]));

            setFilas(filasConvertidas);
            setTotalPaginas(Math.ceil(productos.length / productosPorPagina));

        } catch (error) {
            console.error('Error al obtener productos:', error);
            mostrarNotificacion("❌ Error al cargar los productos.", "error");
        }
    };

    const confirmarEliminar = async () => {
        try {
            const res = await axios.delete(`${API_URL}/api/administrador/productos/${confirmacion.id}/`);
            mostrarNotificacion(res.data.message || "Producto eliminado correctamente.", "exito");
            obtenerProductos();
        } catch (error) {
            const mensaje = error.response?.data?.error || error.response?.data?.message || "No se pudo eliminar el producto.";
            mostrarNotificacion(mensaje, "error");
            console.error("Error al eliminar producto:", error);
        } finally {
            setConfirmacion({ visible: false, id: null });
        }
    };

    const cambiarPagina = (numero) => {
        if (numero >= 1 && numero <= totalPaginas) setPaginaActual(numero);
    };

    useEffect(() => {
        obtenerProductos();
    }, [categoriaSeleccionada, paginaActual]);

    return (
        <>
            <CategoriasAdmin />

            <div className='admintabla'>
                <TablaAdmin encabezados={encabezados} filas={filas} />
                <div className='iconos_acciones'>
                    <Link to='/AgregarInven' title="Agregar producto">
                        <img src={agregar_documento} alt="Agregar" />
                    </Link>
                </div>

                {/* Paginación */}
                <div className="paginacion">
                    <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>Anterior</button>

                    {[...Array(totalPaginas)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => cambiarPagina(index + 1)}
                            className={paginaActual === index + 1 ? 'activo' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>Siguiente</button>
                </div>
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
                        <p>¿Estás seguro de eliminar este producto?</p>
                        <div className="modal-botones">
                            <button onClick={confirmarEliminar} className="btn-confirmar">Sí</button>
                            <button onClick={() => setConfirmacion({ visible: false, id: null })} className="btn-cancelar">No</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
