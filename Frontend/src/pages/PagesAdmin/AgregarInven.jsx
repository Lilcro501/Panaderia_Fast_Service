    // Importamos React y algunos hooks que permiten trabajar con estado y efectos
    import React, { useState, useEffect } from 'react';

    // useNavigate permite redirigir a otra página después de guardar
    import { useNavigate } from 'react-router-dom';

    // Variables de entorno para Cloudinary (servicio para guardar imágenes en la nube)
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    // Librería para hacer peticiones HTTP
    import axios from 'axios';

    // Estilos CSS para esta página
    import '../../assets/styles/AgregarInven.css';
    import '../../assets/styles/Global.css';

    // Componente de formulario reutilizable para mostrar los campos
    import FormularioAdmin from '../../components/FormularioAdmin';


    // Componente principal para agregar un nuevo producto
    export default function AgregarInven() {

        const navigate = useNavigate(); // Función para navegar entre páginas
        const [categorias, setCategorias] = useState([]); // Estado para guardar las categorías traídas del backend

        // useEffect se ejecuta al cargar el componente
        useEffect(() => {
            const token = localStorage.getItem("access"); // 🔑 Obtenemos el token

            axios.get("http://localhost:8000/api/administrador/categorias/", {
                headers: {
                    Authorization: `Bearer ${token}` // 🔥 Token en cabecera
                }
            })
                .then(response => {
                    setCategorias(response.data);
                })
                .catch(error => {
                    console.error("Error al cargar categorías:", error.response?.data || error);
                    alert("No se pudieron cargar las categorías.");
                });
        }, []);

        // Mientras se cargan las categorías, mostramos un mensaje
        if (categorias.length === 0) return <p>Cargando categorías...</p>;

        // Lista de campos que tendrá el formulario
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

        // Esta función se ejecuta cuando el usuario envía el formulario
        const manejarEnvio = async (datos) => {
            try {
                const token = localStorage.getItem("access"); // 🔑 Obtenemos el token

                // 1. Buscamos el nombre de la categoría seleccionada para crear la carpeta en Cloudinary
                const categoriaSeleccionada = categorias.find(
                    cat => cat.id_categoria === parseInt(datos.id_categoria_id)
                );
                const nombreCategoria = categoriaSeleccionada.nombre.toLowerCase();

                // 2. Subimos la imagen del producto a Cloudinary
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

                // 3. Preparamos los datos para enviar al backend
                const datosParaBackend = {
                    ...datos,
                    imagen: imagenUrl,
                    imagen_public_id: imagenPublicId
                };

                // 4. Enviamos los datos al backend de Django con el token
                await axios.post(
                    'http://localhost:8000/api/administrador/productos/',
                    datosParaBackend,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}` // 🔥 Mandamos token
                        }
                    }
                );

                alert("Producto agregado exitosamente.");
                navigate("/AdministrarInven");

            } catch (error) {
                console.error("Error al agregar producto:", error.response?.data || error.message);
                alert("No se pudo agregar el producto.");
            }
        };

        // Botones que se muestran al final del formulario
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
                    validacionesPersonalizadas={{
                        nombre: (valor) =>
                            !valor || valor.trim() === "" ? "El nombre es obligatorio" : null,

                        precio: (valor) =>
                            valor <= 0 ? "El precio debe ser mayor a 0" : null,

                        descripcion: (valor) =>
                            !valor || valor.trim().length < 10
                                ? "La descripción debe tener al menos 10 caracteres"
                                : null,

                        stock: (valor) =>
                            valor < 0 ? "El stock no puede ser negativo" : null,

                        fecha_vencimiento: (valor) => {
                            if (!valor) return "La fecha de vencimiento es obligatoria";
                            const hoy = new Date();
                            const fechaIngresada = new Date(valor);
                            return fechaIngresada <= hoy
                                ? "La fecha de vencimiento debe ser posterior a hoy"
                                : null;
                        }
                    }}
                />
            </div>
        );
    }
