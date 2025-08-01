import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

// Estilos
import '../../assets/styles/AdministrarInven.css';
import "../../assets/styles/Global.css";

// Componentes
import CategoriasAdmin from "../../components/CategoriasAdmin";
import TablaAdmin from '../../components/TablaAdmin';

// Imágenes 
import agregar_documento from '../../assets/images/agregar_documento.png';
import editar_documento from '../../assets/images/editar_documento.png';
import eliminar_documento from '../../assets/images/eliminar_documento.png';

// Hook para leer query params
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function AdministrarInven() {
    const [filas, setFilas] = useState([]);
    const query = useQuery();
    const categoriaSeleccionada = query.get("categoria"); // puede ser null

    const encabezados = [
        'ID',
        'Nombre',
        'Precio',
        'Stock',
        'Fecha Vencimiento',
        'Acciones'
    ];

    const obtenerProductos = () => {
        axios.get('http://localhost:8000/api/productos/')
            .then(response => {
                let productos = response.data;

                // Filtrar por categoría si hay una seleccionada
                if (categoriaSeleccionada) {
                    productos = productos.filter(
                        producto =>
                            producto.id_categoria?.nombre?.toLowerCase() === categoriaSeleccionada.toLowerCase()
                    );
                }

                const filasConvertidas = productos.map(producto => ([
                    producto.id_producto,
                    producto.nombre,
                    `$${parseFloat(producto.precio).toLocaleString()}`,
                    producto.stock,
                    producto.fecha_vencimiento || 'N/A',
                    <div key={`acciones-${producto.id_producto}`} className="acciones_tabla">
                        <Link to={`/EditarInven/${producto.id_producto}`}>
                            <img
                                src={editar_documento}
                                alt="Editar"
                                title="Editar producto"
                                className="icono_tabla"
                            />
                        </Link>
                        <button
                            onClick={() => manejarEliminar(producto.id_producto)}
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

                setFilas(filasConvertidas);
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
                alert("Error al cargar los productos.");
            });
    };

    useEffect(() => {
        obtenerProductos();
    }, [categoriaSeleccionada]);

    const manejarEliminar = async (id) => {
        const confirmacion = window.confirm("¿Estás seguro de eliminar este producto?");
        if (!confirmacion) return;

        try {
            await axios.delete(`http://localhost:8000/api/productos/${id}/`);
            alert("Producto eliminado correctamente.");
            obtenerProductos(); // Refrescar lista
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            alert("No se pudo eliminar el producto.");
        }
    };

    return (
        <>
            {/* Barra de categorías */}
            <CategoriasAdmin />


            {/* Tabla de productos */}
            <div className='admintabla'>
                <TablaAdmin encabezados={encabezados} filas={filas} />
                <br />
            </div>

            {/* Icono para agregar */}
            <div className='iconos_acciones'>
                <Link to='/AgregarInven' title="Agregar producto">
                    <img src={agregar_documento} alt="Agregar" />
                </Link>
            </div>
        </>
    );
}
