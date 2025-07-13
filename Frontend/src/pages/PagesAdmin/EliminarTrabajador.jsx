import React, { useRef, useState } from 'react';
//~~~~~~~~~~~~~~ Componentes ~~~~~~~~~~~~~~
import FormularioAdmin from '../../components/FormularioAdmin';
import NotificacionAdmin from '../../components/NotificacionAdmin';
//~~~~~~~~~~~~~~ Estilo Global~~~~~~~~~~~~~~
import "../../assets/styles/Global.css"


export default function EliminarTrabajador() {
    // estado para mostrar u ocultar la notificacion
    const [mostrarNotificacion, setMostrarNotificacion] = useState(false);


    // Definimos los campos del formulario
    const camposProducto = [
        {
            nombre: 'stock',
            etiqueta: 'Cédula',
            tipo: 'number',
            requerido: true
        },
    ];

    // Función para manejar el envío de datos del formulario
    const manejarEnvio = (datos, evento) => {
        if (evento) evento.preventDefault();
        console.log("Datos recibidos del formulario:", datos);

        // Ejemplo de creacion de formdata (útil para enviar datos a backend)
        const formData = new FormData();
        for (const clave in datos) {
            formData.append(clave, datos[clave]);
        }

        // Aquí podrías hacer una petición POST al backend
        // fetch('/api/productos', { method: 'POST', body: formData })

        setMostrarNotificacion(true)
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

                {/*Notificacion */}
                {mostrarNotificacion && (
                    <NotificacionAdmin
                        mensaje="¿Deseas eliminar este trabajador?"
                        onConfirmar={() => {
                            //Acción a ejecutar si el usuario confirma la eliminación
                            console.log("Trabajador eliminado"); // aquí puedes usar valores reales del formulario
                            setMostrarNotificacion(false);
                        }}
                        onCancelar={() => {
                            console.log("Operación cancelada");
                            setMostrarNotificacion(false)
                        }}
                    />
                )}
            </div>
        </>
    );
}


