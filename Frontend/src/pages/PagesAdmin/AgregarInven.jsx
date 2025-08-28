// Importamos React y algunos hooks que permiten trabajar con estado y efectos
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const API_URL = import.meta.env.VITE_API_URL; // <-- Aquí usamos la variable de entorno

import '../../assets/styles/FormularioAdmin.css';
import '../../assets/styles/Global.css';
import FormularioAdmin from '../../components/FormularioAdmin';

export default function AgregarInven() {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);

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

    useEffect(() => {
        axios.get(`${API_URL}/api/administrador/categorias/`)
            .then(response => setCategorias(response.data))
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
            requerido: true
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
            nombre: 'descripcion',
            etiqueta: 'Descripción',
            tipo: 'textarea',
            placeholder: 'Ej: Pan hecho con harina integral 100%',
            requerido: true
        },
        {
            nombre: 'stock',
            etiqueta: 'Stock disponible',
            tipo: 'number',
            placeholder: 'Ej: 30',
            requerido: true
        },
        {
            nombre: 'fecha_vencimiento',
            etiqueta: 'Fecha de vencimiento',
            tipo: 'date',
            requerido: true
        },
        {
            nombre: 'id_categoria_id',
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
            const categoriaSeleccionada = categorias.find(
                cat => cat.id_categoria === parseInt(datos.id_categoria_id)
            );
            const nombreCategoria = categoriaSeleccionada.nombre.toLowerCase();

            let imagenUrl = '';
            let imagenPublicId;

            if (datos.imagen) {
                const cloudinaryData = new FormData();
                cloudinaryData.append('file', datos.imagen);
                cloudinaryData.append('upload_preset', uploadPreset);
                cloudinaryData.append('folder', `productos/${nombreCategoria}`);

                const cloudinaryResponse = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    cloudinaryData
                );

                imagenUrl = cloudinaryResponse.data.secure_url;
                imagenPublicId = cloudinaryResponse.data.public_id;
            }

            const datosParaBackend = {
                ...datos,
                imagen: imagenUrl,
                imagen_public_id: imagenPublicId
            };

            await axios.post(`${API_URL}/api/administrador/productos/`, datosParaBackend, {
                headers: { 'Content-Type': 'application/json' }
            });

            mostrarNotificacion("Producto agregado exitosamente.", "exito");
            setTimeout(() => navigate("/AdministrarInven"), 2000);

        } catch (error) {
            console.error("Error al agregar producto:", error.response?.data || error.message);
            mostrarNotificacion("❌ No se pudo agregar el producto.", "error");
        }
    };

    const botones = [
        { texto: 'Guardar', tipo: 'submit', clase: 'guardar', onClick: null },
        { texto: 'Salir', tipo: 'button', clase: 'salir', onClick: () => navigate('/AdministrarInven') }
    ];

    return (
        <div className="contenedor_formulario_inventario">
            <h1 className='titulo'>Registrar nuevo producto</h1>
            <FormularioAdmin
                campos={camposProducto}
                onSubmit={manejarEnvio}
                botonesPersonalizados={botones}
                validacionesPersonalizadas={{
                    nombre: (valor) => !valor || valor.trim() === "" ? "El nombre es obligatorio" : null,
                    precio: (valor) => valor <= 0 ? "El precio debe ser mayor a 0" : null,
                    descripcion: (valor) => !valor || valor.trim().length < 10 ? "La descripción debe tener al menos 10 caracteres" : null,
                    stock: (valor) => valor < 0 ? "El stock no puede ser negativo" : null,
                    fecha_vencimiento: (valor) => {
                        if (!valor) return "La fecha de vencimiento es obligatoria";
                        const hoy = new Date();
                        const fechaIngresada = new Date(valor);
                        return fechaIngresada <= hoy ? "La fecha de vencimiento debe ser posterior a hoy" : null;
                    }
                }}
            />
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
