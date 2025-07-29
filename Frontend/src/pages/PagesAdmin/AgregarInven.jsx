import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
            const formData = new FormData();
            for (const clave in datos) {
                formData.append(clave, datos[clave]);
            }

            await axios.post('http://localhost:8000/api/productos/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                    // Agrega Authorization si es necesario
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
            texto: 'Limpiar',
            tipo: 'reset',
            clase: 'limpiar',
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
