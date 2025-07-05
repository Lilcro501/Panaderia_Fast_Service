import React, { useRef, useState } from 'react';
//~~~~~~~~~~~~~~ Componentes ~~~~~~~~~~~~~~
import FormularioAdmin from '../../components/FormularioAdmin';
//~~~~~~~~~~~~~~ Estilo Global~~~~~~~~~~~~~~
import "../../assets/styles/Global.css"


export default function Agregar_EditarTrabajador() {
    // Definimos los campos del formulario
    const camposProducto = [
        {
            nombre: 'stock',
            etiqueta: 'Cédula',
            tipo: 'number',
            requerido: true
        },

        {
            nombre: 'nombre',
            etiqueta: 'Nombre Completo',
            tipo: 'text',
            requerido: true
        },
        {
            nombre: 'descripcion',
            etiqueta: 'Cargo',
            tipo: 'text',
            requerido: true
        },

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
                texto: 'Aceptar',      // Texto que se verá en el botón
                tipo: 'submit',        // Tipo submit: envía el formulario
                clase: 'guardar',      // Clase CSS para estilo personalizado
                onClick: null          // Usa el onSubmit del formulario
            },
            {
                texto: 'Cancelar',
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
            <div className="contenedor_formulario_inventario">
                {/* Aquí insertamos el formulario reutilizable */}
                <FormularioAdmin 
                campos={camposProducto} 
                onSubmit={manejarEnvio} 
                botonesPersonalizados={botones}/>
            </div>
        </>
    );
}


