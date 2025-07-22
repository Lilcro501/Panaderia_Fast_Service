import React from 'react';
//~~~~~~~~~~~~~~ Estilo ~~~~~~~~~~~~~~
import '../../assets/styles/AgregarInven.css'; 
//~~~~~~~~~~~~~~ Componentes ~~~~~~~~~~~~~~
import CategoriasAdmin from "../../components/CategoriasAdmin"
import FormularioAdmin from '../../components/FormularioAdmin';
//~~~~~~~~~~~~~~ Estilo Global~~~~~~~~~~~~~~
import "../../assets/styles/Global.css"


export default function AgregarInven() {
    // Definimos los campos del formulario
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
        }
    ];

    // Función para manejar el envío de datos del formulario
    const manejarEnvio = (datos) => {
        console.log("Datos recibidos del formulario:", datos);

        // Enviar datos como FormData
        const formData = new FormData();
        for (const clave in datos) {
            formData.append(clave, datos[clave]);
        }

        // Aquí podrías hacer una petición POST al backend
        // fetch('/api/productos', { method: 'POST', body: formData })
    };

        const botones = [
            {
                texto: 'Guardar',      // Texto que se verá en el botón
                tipo: 'submit',        // Tipo submit: envía el formulario
                clase: 'guardar',      // Clase CSS para estilo personalizado
                onClick: null          // Usa el onSubmit del formulario
            },
            {
                texto: 'Limpiar',     
                tipo: 'reset',       //limpia los campos
                clase: 'Limpiar',     
                onClick: null         
            },
            {
                texto: 'Salir',
                tipo: 'button',
                clase: 'salir',
                onClick: () => {
                    // Aquí defines qué hacer cuando se cancela
                    console.log("Formulario cancelado");
                    // Podrías redirigir, cerrar modal, limpiar campos, etc.
            }
            }
    ];


    return (
        <>
            {/* Categorias */}
            <CategoriasAdmin></CategoriasAdmin>
            <br />
            <br />

            <div className="contenedor_formulario_inventario">
                <h2 className='H2'>Registrar nuevo producto</h2>
                <br />

                {/* Aquí insertamos el formulario reutilizable */}
                <FormularioAdmin 
                campos={camposProducto} 
                onSubmit={manejarEnvio} 
                botonesPersonalizados={botones}/>
            </div>
        </>
    );
}


