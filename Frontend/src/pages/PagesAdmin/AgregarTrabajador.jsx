import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//~~~~~~~~~~~~~~ Componentes ~~~~~~~~~~~~~~
import FormularioAdmin from '../../components/FormularioAdmin';
//~~~~~~~~~~~~~~ Estilo Global ~~~~~~~~~~~~~~
import "../../assets/styles/Global.css";

export default function AgregarTrabajador() {
    const navigate = useNavigate();

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
            const response = await axios.post('http://localhost:8000/api/administrador/usuarios/', datos);
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
            onClick: () => navigate("/AdministrarTrabajadores")
        }
    ];

    return (
        <div className="contenedor_formulario_inventario">
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
                        if (!valor) return "El teléfono es obligatorio"; // ✅ ahora requerido
                        const regex = /^[0-9]{10}$/;
                        return !regex.test(valor)
                            ? "El teléfono debe contener exactamente 10 dígitos"
                            : null;
                    }
                }}
            />
        </div>
    );
}
