// Importamos React y algunos hooks (useEffect y useState) que nos permiten usar estado y efectos secundarios en este componente
import React, { useEffect, useState } from 'react';

// Importamos funciones de react-router-dom para manejar rutas y leer parámetros de la URL
import { Link, useLocation } from 'react-router-dom';

// Importamos axios para hacer peticiones HTTP al backend (como obtener o eliminar productos)
import axios from 'axios';

// Importamos los archivos CSS que contienen los estilos de la página
import '../../assets/styles/AdministrarInven.css';
import "../../assets/styles/Global.css";

// Importamos componentes que vamos a usar en esta página
import CategoriasAdmin from "../../components/CategoriasAdmin"; // Para mostrar la barra de categorías
import TablaAdmin from '../../components/TablaAdmin';           // Para mostrar la tabla de productos

// Importamos imágenes que usaremos como íconos para agregar, editar y eliminar productos
import agregar_documento from '../../assets/images/agregar_documento.png';
import editar_documento from '../../assets/images/editar_documento.png';
import eliminar_documento from '../../assets/images/eliminar_documento.png';

// Esta función personalizada nos permite leer los parámetros de la URL (query params)
function useQuery() {
    return new URLSearchParams(useLocation().search); // Ejemplo: si la URL es /admin?categoria=bebidas, retorna "bebidas"
}

// Componente principal para administrar el inventario
export default function AdministrarInven() {

    // Creamos un estado llamado 'filas' para guardar los datos que vamos a mostrar en la tabla
    const [filas, setFilas] = useState([]);

    // Estado para manejar notificaciones (mensaje de éxito o error)
    const [notificacion, setNotificacion] = useState({
        visible: false,
        mensaje: "",
        tipo: ""
    });

    // Estado para manejar el modal de confirmación
    const [confirmacion, setConfirmacion] = useState({
        visible: false,
        id: null
    });

    // Función que muestra una notificación por 2 segundos
    const mostrarNotificacion = (mensaje, tipo) => {
        setNotificacion({ visible: true, mensaje, tipo });
        setTimeout(() => {
            setNotificacion({ visible: false, mensaje: "", tipo: "" });
        }, 2000);
    };

    // Llamamos a la función useQuery para poder acceder al parámetro de la categoría
    const query = useQuery();

    // Obtenemos el valor del parámetro "categoria" de la URL (puede ser null si no hay ninguno)
    const categoriaSeleccionada = query.get("categoria");

    // Definimos los encabezados de la tabla
    const encabezados = [
        'ID',
        'Nombre',
        'Precio',
        'Stock',
        'Fecha Vencimiento',
        'Acciones'
    ];

    // Función para obtener los productos desde el backend
    const obtenerProductos = () => {
        // Hacemos una solicitud GET a la API que trae todos los productos
        axios.get('http://localhost:8000/api/administrador/productos/')
            .then(response => {
                // Guardamos los productos que vienen de la respuesta
                let productos = response.data;

                // Si hay una categoría seleccionada, filtramos solo los productos de esa categoría
                if (categoriaSeleccionada) {
                    productos = productos.filter(
                        producto =>
                            producto.id_categoria?.nombre?.toLowerCase() === categoriaSeleccionada.toLowerCase()
                    );
                }

                // Convertimos cada producto a una fila que se mostrará en la tabla
                const filasConvertidas = productos.map(producto => ([
                    producto.id_producto, // ID del producto
                    producto.nombre,      // Nombre del producto
                    `$${parseFloat(producto.precio).toLocaleString()}`, // Precio con formato de moneda
                    producto.stock,       // Cantidad en stock
                    producto.fecha_vencimiento || 'N/A', // Fecha de vencimiento o 'N/A' si no tiene

                    // Creamos una celda de acciones con botones para editar y eliminar
                    <div key={`acciones-${producto.id_producto}`} className="acciones_tabla">
                        {/* Botón para editar, que lleva a la ruta /EditarInven con el ID del producto */}
                        <Link to={`/EditarInven/${producto.id_producto}`}>
                            <img
                                src={editar_documento}
                                alt="Editar"
                                title="Editar producto"
                                className="icono_tabla"
                            />
                        </Link>

                        {/* Botón para eliminar el producto */}
                        <button
                            onClick={() => setConfirmacion({ visible: true, id: producto.id_producto })} // Mostramos modal
                            className="boton_eliminar_tabla"
                            title="Eliminar producto"
                        >
                            <img
                                src={eliminar_documento}
                                alt="Eliminar"
                                className="icono_tabla"
                            />
                        </button>
                    </div>
                ]));

                // Guardamos las filas convertidas en el estado para mostrarlas en la tabla
                setFilas(filasConvertidas);
            })
            .catch(error => {
                // Si hay un error al traer los productos, lo mostramos en consola y con notificación
                console.error('Error al obtener productos:', error);
                mostrarNotificacion("Error al cargar los productos.", "error");
            });
    };

    // useEffect se ejecuta automáticamente cuando el componente se monta o cuando cambia la categoría seleccionada
    useEffect(() => {
        obtenerProductos(); // Llamamos a la función para cargar los productos
    }, [categoriaSeleccionada]); // Se vuelve a ejecutar si cambia la categoría

    // Función para confirmar la eliminación de un producto
    const confirmarEliminar = async () => {
        try {
            // Llamamos a la API para eliminar el producto
            const respuesta = await axios.delete(`http://localhost:8000/api/administrador/productos/${confirmacion.id}/`);
            // Mostramos notificación de éxito
            mostrarNotificacion(respuesta.data.message || "Producto eliminado correctamente.", "exito");
            // Recargamos la lista de productos
            obtenerProductos();
        } catch (error) {
            // Si hay un error, mostramos mensaje adecuado
            if (error.response && error.response.data) {
                const mensaje = error.response.data.error || error.response.data.message || "Ocurrió un error inesperado.";
                mostrarNotificacion(mensaje, "error");
            } else {
                mostrarNotificacion("No se pudo eliminar el producto. Error de conexión.", "error");
            }
            console.error("Error al eliminar producto:", error);
        } finally {
            // Cerramos el modal de confirmación
            setConfirmacion({ visible: false, id: null });
        }
    };

    // Lo que se va a mostrar en la pantalla
    return (
        <>
            {/* Barra de categorías para filtrar los productos */}
            <CategoriasAdmin />

            {/* Contenedor de la tabla de productos */}
            <div className='admintabla'>
                <TablaAdmin encabezados={encabezados} filas={filas} />
                <br />
            </div>

            {/* Botón (ícono) para agregar un nuevo producto */}
            <div className='iconos_acciones'>
                <Link to='/AgregarInven' title="Agregar producto">
                    <img src={agregar_documento} alt="Agregar" />
                </Link>
            </div>

            {/* Notificación (se muestra solo si está activa) */}
            {notificacion.visible && (
                <div className={`modal-fondo modal-${notificacion.tipo}`}>
                    <div className="modal-contenido">
                        <p>{notificacion.mensaje}</p>
                    </div>
                </div>
            )}

            {/* Modal de confirmación (para reemplazar window.confirm) */}
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
