import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Componentes
import FormularioAdmin from '../../components/FormularioAdmin';
// Estilos
import "../../assets/styles/Global.css";

export default function AgregarTrabajador() {
    const navigate = useNavigate();

    // Estado de notificación
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
            requerido: true
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
            requerido: true
        },
        {
            nombre: 'rol',
            etiqueta: 'Rol',
            tipo: 'select',
            opciones: [
                { valor: 'trabajador', texto: 'Trabajador' }
            ],
            requerido: true
        }
    ];

    const manejarEnvio = async (datos) => {
        try {
            await axios.post('http://localhost:8000/api/administrador/usuarios/', datos);
            mostrarNotificacion("Trabajador guardado con éxito.", "exito");
            setTimeout(() => navigate("/AdministrarTrabajadores"), 2000);
        } catch (error) {
            console.error("Error al guardar el trabajador:", error.response?.data || error);
            mostrarNotificacion("❌ Error al guardar el trabajador. Verifica los datos.", "error");
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
            onClick: () => navigate("/AdministrarTrabajadores")
        }
    ];

    return (
        <div className="contenedor_formulario_inventario">
            <h2>Registrar nuevo trabajador</h2>
            <FormularioAdmin 
                campos={camposTrabajador} 
                onSubmit={manejarEnvio} 
                botonesPersonalizados={botones} 
                validacionesPersonalizadas={{
                    email: (valor) => {
                        if (!valor) return "El correo electrónico es obligatorio";
                        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        return !regex.test(valor) ? "El correo electrónico no es válido" : null;
                    },
                    password: (valor) =>
                        !valor || valor.trim().length < 6
                            ? "La contraseña debe tener al menos 6 caracteres"
                            : null,
                    nombre: (valor) =>
                        !valor || valor.trim().length < 2
                            ? "El nombre debe tener al menos 2 caracteres"
                            : null,
                    apellido: (valor) =>
                        !valor || valor.trim().length < 2
                            ? "El apellido debe tener al menos 2 caracteres"
                            : null,
                    telefono: (valor) => {
                        if (!valor) return "El teléfono es obligatorio";
                        const regex = /^[0-9]{10}$/;
                        return !regex.test(valor)
                            ? "El teléfono debe contener exactamente 10 dígitos"
                            : null;
                    }
                }}
            />

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
