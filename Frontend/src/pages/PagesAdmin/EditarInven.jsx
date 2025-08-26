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

    // 🔹 Config Cloudinary
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const [valoresIniciales, setValoresIniciales] = useState({});
    const [categorias, setCategorias] = useState([]);

    // --- Estado y función para manejar notificaciones ---
    const [notificacion, setNotificacion] = useState({
        visible: false,
        mensaje: "",
        tipo: ""
    });

    const mostrarNotificacion = (mensaje, tipo) => {
        setNotificacion({ visible: true, mensaje, tipo });
        setTimeout(() => {
            setNotificacion({ visible: false, mensaje: "", tipo: "" });
        }, 2000);
    };
    // -----------------------------------------------------

    // Obtener producto
    useEffect(() => {
        axios.get(`http://localhost:8000/api/administrador/productos/${id}/`)
            .then(response => {
                const producto = response.data;
                setValoresIniciales({
                    nombre: producto.nombre,
                    descripcion:producto.descripcion,
                    precio: producto.precio,
                    stock: producto.stock,
                    fecha_vencimiento: producto.fecha_vencimiento,
                    fecha_actualizacion: new Date().toISOString().split('T')[0], // fecha actual
                    id_categoria: producto.id_categoria?.id_categoria || '',
                    imagen_url: producto.imagen, 
                    imagen_public_id: producto.imagen_public_id || null 
                });
            })
            .catch(error => {
                console.error("Error al cargar producto:", error);
                mostrarNotificacion("No se pudo cargar el producto.", "error");
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
                mostrarNotificacion("No se pudieron cargar las categorías.", "error");
            });
    }, []);

    if (categorias.length === 0) return <p>Cargando categorías...</p>;

    const camposProducto = [
        {
            nombre: 'imagen',
            etiqueta: 'Imagen del producto',
            tipo: 'file',
            requerido: false,
            vistaPrevia: valoresIniciales.imagen_url || null 
        },
        {
            nombre: 'nombre',
            etiqueta: 'Nombre del producto',
            tipo: 'text',
            placeholder: 'Ej: Pan integral',
            requerido: true
        },
        {
            nombre: 'descripcion',
            etiqueta: 'Descripcion',
            tipo: 'text',
            placeholder: 'Ej: Pan hecho con harina integral 100%',
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
        },
        {
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
        try {
            // 1. Buscar la categoría seleccionada para crear la carpeta en Cloudinary
            const categoriaSeleccionada = categorias.find(
                cat => cat.id_categoria === parseInt(datos.id_categoria)
            );
            const nombreCategoria = categoriaSeleccionada.nombre.toLowerCase();

            // 2. Subir imagen a Cloudinary (solo si el usuario seleccionó una nueva)
            let imagenUrl = valoresIniciales.imagen_url;   
            let imagenPublicId = valoresIniciales.imagen_public_id;

            if (datos.imagen && datos.imagen instanceof File) {
                const cloudinaryData = new FormData();
                cloudinaryData.append("file", datos.imagen);
                cloudinaryData.append("upload_preset", uploadPreset); 
                cloudinaryData.append("folder", `productos/${nombreCategoria}`);

                const cloudinaryResponse = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    cloudinaryData
                );

                imagenUrl = cloudinaryResponse.data.secure_url;
                imagenPublicId = cloudinaryResponse.data.public_id;
            }

            // 3. Preparar datos para el backend
            const datosParaBackend = {
                ...datos,
                id_categoria_id: datos.id_categoria,
                imagen: imagenUrl,
                imagen_public_id: imagenPublicId
            };
            delete datosParaBackend.id_categoria; 

            // 4. Enviar actualización al backend
            await axios.put(
                `http://localhost:8000/api/administrador/productos/${id}/`,
                datosParaBackend,
                { headers: { "Content-Type": "application/json" } }
            );

            mostrarNotificacion(" ✅ Producto actualizado correctamente.", "exito");
            setTimeout(() => navigate("/AdministrarInven"), 2000);

        } catch (error) {
            console.error("Error al actualizar producto:", error.response?.data || error.message);
            mostrarNotificacion("❌ No se pudo actualizar el producto.", "error");
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
        <div className="contenedor_formulario_inventario">
            <h2>Editar producto</h2>
            <div className='fila-campos'>
                <FormularioAdmin
                    campos={camposProducto}
                    onSubmit={manejarEnvio}
                    botonesPersonalizados={botones}
                    valoresIniciales={valoresIniciales}
                    validacionesPersonalizadas={{
                        nombre: (valor) =>
                            !valor || valor.trim().length < 3
                                ? "El nombre debe tener al menos 3 caracteres"
                                : null,
                        
                        descripcion: (valor) =>
                            !valor || valor.trim().length < 10
                                ? "La descripción debe tener al menos 10 caracteres"
                                : null,

                        precio: (valor) => {
                            if (!valor) return "El precio es obligatorio";
                            return valor <= 0 ? "El precio debe ser mayor que 0" : null;
                        },

                        stock: (valor) => {
                            if (valor === "" || valor === null) return "El stock es obligatorio";
                            return valor < 0 ? "El stock no puede ser negativo" : null;
                        },

                        fecha_vencimiento: (valor) => {
                            if (!valor) return null; 
                            const hoy = new Date().toISOString().split("T")[0];
                            return valor < hoy
                                ? "La fecha de vencimiento no puede ser anterior a hoy"
                                : null;
                        },

                        fecha_actualizacion: (valor) => {
                            if (!valor) return "La fecha de actualización es obligatoria";
                            const hoy = new Date().toISOString().split("T")[0];
                            return valor !== hoy
                                ? "La fecha de actualización debe ser la de hoy"
                                : null;
                        },

                        id_categoria: (valor) =>
                            !valor ? "Debe seleccionar una categoría" : null,
                    }}
                />
            </div>

            {/* Renderizado condicional de la notificación */}
            {notificacion.visible && (
                <div className={`modal-fondo modal-${notificacion.tipo}`}>
                    <div className="modal-contenido">
                        <p>{notificacion.mensaje}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
