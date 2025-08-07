// ~~~~~~~~~~~~~~ importar React, hooks, etc ~~~~~~~~~~~~~~
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../../assets/styles/EditarInven.css';
import "../../assets/styles/Global.css";
import FormularioAdmin from '../../components/FormularioAdmin';

export default function EditarInven() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [valoresIniciales, setValoresIniciales] = useState({});
    const [categorias, setCategorias] = useState([]);

    // Obtener producto
    useEffect(() => {
        axios.get(`http://localhost:8000/api/administrador/productos/${id}/`)
            .then(response => {
                const producto = response.data;
                setValoresIniciales({
                    nombre: producto.nombre,
                    precio: producto.precio,
                    stock: producto.stock,
                    fecha_vencimiento: producto.fecha_vencimiento,
                    id_categoria: producto.id_categoria || '',
                    imagen_url: producto.imagen, // 👈 añadimos la imagen actual
                    imagen_public_id: producto.imagen_public_id || null // 👈 si lo tienes
                });
            })
            .catch(error => {
                console.error("Error al cargar producto:", error);
                alert("No se pudo cargar el producto.");
            });
    }, [id]);

    // Obtener categorías
    useEffect(() => {
        axios.get("http://localhost:8000/api/administrador/categorias/")
            .then(response => {
                setCategorias(response.data);
            })
            .catch(error => {
                console.error("Error al cargar categorías:", error);
                alert("No se pudieron cargar las categorías.");
            });
    }, []);

    if (categorias.length === 0) return <p>Cargando categorías...</p>;

    const camposProducto = [
        {
            nombre: 'imagen',
            etiqueta: 'Imagen del producto',
            tipo: 'file',
            requerido: false,
            vistaPrevia: valoresIniciales.imagen_url || null // 👈 para mostrar imagen actual
        },
        {
            nombre: 'nombre',
            etiqueta: 'Nombre del producto',
            tipo: 'text',
            placeholder: 'Ej: Pan integral',
            requerido: true
        },
        {
            nombre: 'precio',
            etiqueta: 'Precio ($)',
            tipo: 'number',
            placeholder: 'Ej: 2500',
            requerido: true
        },
        {
            nombre: 'stock',
            etiqueta: 'Stock disponible',
            tipo: 'number',
            placeholder: 'Ej: 20',
            requerido: true
        },
        {
            nombre: 'fecha_vencimiento',
            etiqueta: 'Fecha de vencimiento',
            tipo: 'date',
            requerido: false
        },{
            nombre: 'fecha_actualizacion',
            etiqueta: 'Fecha de actualización',
            tipo: 'date',
            requerido: true
        },
        {
            nombre: 'id_categoria',
            etiqueta: 'Categoría',
            tipo: 'select',
            opciones: categorias.map(cat => ({
                valor: cat.id_categoria,
                etiqueta: cat.nombre
            })),
            requerido: true
        }
    ];

    const manejarEnvio = async (datos) => {
        const datosProcesados = {
            ...datos,
            id_categoria_id: datos.id_categoria
        };
        delete datosProcesados.id_categoria;

        try {
            const formData = new FormData();
            Object.entries(datosProcesados).forEach(([key, value]) => {
                formData.append(key, value);
            });

            await axios.put(`http://localhost:8000/api/administrador/productos/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert("Producto actualizado correctamente.");
            navigate("/AdministrarInven");
        } catch (error) {
            console.error("Error al actualizar producto:", error.response?.data || error);
            alert("No se pudo actualizar el producto.");
        }
    };

    const botones = [
        {
            texto: 'Guardar',
            tipo: 'submit',
            clase: 'guardar',
            onClick: null
        },
        {
            texto: 'Salir',
            tipo: 'button',
            clase: 'salir',
            onClick: () => navigate('/AdministrarInven')
        }
    ];

    return (
        <>
            <div className="contenedor_formulario_inventario">
                <h2>Editar producto</h2>
                <div className='fila-campos'>
                    <FormularioAdmin
                        campos={camposProducto}
                        onSubmit={manejarEnvio}
                        botonesPersonalizados={botones}
                        valoresIniciales={valoresIniciales}
                    />
                </div>
            </div>
        </>
    );
}
 