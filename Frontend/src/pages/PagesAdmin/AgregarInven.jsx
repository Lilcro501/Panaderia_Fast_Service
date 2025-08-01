import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
import axios from 'axios';
// Estilos
import '../../assets/styles/AgregarInven.css';
import '../../assets/styles/Global.css';
// Componentes
import FormularioAdmin from '../../components/FormularioAdmin';

export default function AgregarInven() {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);

    // Obtener las categorías desde el backend
    useEffect(() => {
        axios.get("http://localhost:8000/api/categorias/")
            .then(response => {
                setCategorias(response.data);
            })
            .catch(error => {
                console.error("Error al cargar categorías:", error);
                alert("No se pudieron cargar las categorías.");
            });
    }, []);

    // Evita renderizar si aún no cargan
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

    // Manejar envío al backend
    const manejarEnvio = async (datos) => {
        try {
            // 1. Obtener la categoría seleccionada
            const categoriaSeleccionada = categorias.find(
                cat => cat.id_categoria === parseInt(datos.id_categoria_id)
            );
            const nombreCategoria = categoriaSeleccionada.nombre.toLowerCase();

            // 2. Subir imagen a Cloudinary si existe
            let imagenUrl = '';
            let imagenPublicId

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

            // 3. Preparar datos para el backend Django
            const datosParaBackend = {
                ...datos,
                imagen: imagenUrl,  // Reemplazamos el File con la URL de Cloudinary
                imagen_public_id: imagenPublicId 
            };

            // 4. Enviar al backend
            await axios.post('http://localhost:8000/api/productos/', datosParaBackend, {
                headers: {
                    'Content-Type': 'application/json'  // Cambiado porque ya no enviamos FormData
                }
            });

            alert("Producto agregado exitosamente.");
            navigate("/AdministrarInven");
        } catch (error) {
            console.error("Error al agregar producto:", error.response?.data || error.message);
            alert("No se pudo agregar el producto.");
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
            <h2>Registrar nuevo producto</h2>
            <FormularioAdmin
                campos={camposProducto}
                onSubmit={manejarEnvio}
                botonesPersonalizados={botones}
            />
        </div>
    );
}
