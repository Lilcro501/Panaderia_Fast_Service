import React, { useRef, useState } from 'react';
//~~~~~~~~~~~~~~ Componentes ~~~~~~~~~~~~~~
import Categorias from "../../components/Categorias"
import FormularioAdmin from '../../components/FormularioAdmin';
import NotificacionAdmin from '../../components/NotificacionAdmin';
//~~~~~~~~~~~~~~ Estilo Global~~~~~~~~~~~~~~
import "../../assets/styles/Global.css"



export default function EliminarInven() {

    // notificacion
    const [mostrarNotificacion, setMostrarNotificacion] = useState(false);

    // Definimos los campos del formulario
    const camposProducto = [
        {
            nombre: 'nombre',
            etiqueta: 'Nombre del producto',
            tipo: 'text',
            placeholder: 'Ej: Pan integral',
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
                onClick: () => {
                    setMostrarNotificacion(true); // muestra la notificacion
                }         
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
            {/* Categorias */}
            <Categorias></Categorias>

            <div className="contenedor_formulario_inventario">
                <h2>Eliminar producto</h2>
                <br />

                <div className='fila-campos'>
                    {/* Aquí insertamos el formulario reutilizable */}
                    {/*Prop = Información que se envía desde el componente padre al hijo.
                    Se escribe dentro del componente hijo como atributos:<Formulario campos={...} onSubmit={...} />
                    Se pone en el lugar donde renderizas el componente hijo */}
                    <FormularioAdmin 
                    campos={camposProducto} 
                    onSubmit={manejarEnvio}
                    botonesPersonalizados={botones}/>
                </div>
                
                {/*Notificacion */}
                {mostrarNotificacion && (
                    <NotificacionAdmin
                        mensaje="¿Deseas eliminar este producto del inventario?"
                        onConfirmar={() => {
                            manejarEnvio({ nombre: 'Pan integral' }); // aquí puedes usar valores reales del formulario
                            setMostrarNotificacion(false);
                        }}
                        onCancelar={() => setMostrarNotificacion(false)}
                    />
                )}
            </div>
        </>
    );
}
