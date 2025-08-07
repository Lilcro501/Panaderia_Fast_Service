import React from 'react';
import axios from 'axios';
//~~~~~~~~~~~~~~ Componentes ~~~~~~~~~~~~~~
import FormularioAdmin from '../../components/FormularioAdmin';
//~~~~~~~~~~~~~~ Estilo Global ~~~~~~~~~~~~~~
import "../../assets/styles/Global.css";

export default function AgregarTrabajador() {
    const camposTrabajador = [
        {
            nombre: 'email',
            etiqueta: 'Correo Electrónico',
            tipo: 'email',
            requerido: true
        },
        {
            nombre: 'password',
            etiqueta: 'Contraseña',
            tipo: 'text',
            requerido: false
        },
        {
            nombre: 'nombre',
            etiqueta: 'Nombre',
            tipo: 'text',
            requerido: true
        },
        {
            nombre: 'apellido',
            etiqueta: 'Apellido',
            tipo: 'text',
            requerido: true
        },
        {
            nombre: 'telefono',
            etiqueta: 'Teléfono',
            tipo: 'number',
            requerido: false
        }
        
    ];

    const manejarEnvio = async (datos) => {
        try {
            const response = await axios.post('http://localhost:8000/api/usuarios/', datos);
            console.log("Trabajador creado exitosamente:", response.data);
            alert("Trabajador guardado con éxito.");
        } catch (error) {
            console.error("Error al guardar el trabajador:", error.response?.data || error);
            alert("Error al guardar el trabajador. Verifica los datos.");
        }
    };

    const botones = [
        {
            texto: 'Aceptar',
            tipo: 'submit',
            clase: 'guardar',
            onClick: null
        },
        {
            texto: 'Cancelar',
            tipo: 'button',
            clase: 'salir',
            onClick: () => {
                console.log("Formulario cancelado");
            }
        }
    ];

    return (
        <div className="contenedor_formulario_inventario">
            <FormularioAdmin 
                campos={camposTrabajador} 
                onSubmit={manejarEnvio} 
                botonesPersonalizados={botones} 
            />
        </div>
    );
}
