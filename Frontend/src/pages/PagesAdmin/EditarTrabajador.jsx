//~~~~~~~~~~~~~~ Librerías ~~~~~~~~~~~~~~
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

//~~~~~~~~~~~~~~ Componentes ~~~~~~~~~~~~~~
import FormularioAdmin from '../../components/FormularioAdmin';

//~~~~~~~~~~~~~~ Estilo Global ~~~~~~~~~~~~~~
import "../../assets/styles/Global.css";

export default function EditarTrabajador() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [datosIniciales, setDatosIniciales] = useState(null);
    const [cargando, setCargando] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL; // <-- Usamos la variable de entorno

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
        { nombre: 'email', etiqueta: 'Correo Electrónico', tipo: 'email', requerido: true },
        { nombre: 'nombre', etiqueta: 'Nombre', tipo: 'text', requerido: true },
        { nombre: 'apellido', etiqueta: 'Apellido', tipo: 'text', requerido: true },
        { nombre: 'telefono', etiqueta: 'Teléfono', tipo: 'text', requerido: false }
    ];

    // Verificación inicial del ID y carga de datos
    useEffect(() => {
        if (!id) {
            mostrarNotificacion("ID no válido.", "error");
            setTimeout(() => navigate("/AdministrarTrabajadores"), 2000);
            return;
        }

        axios.get(`${API_URL}/api/administrador/usuarios/${id}/`)
            .then(res => setDatosIniciales(res.data))
            .catch(err => {
                console.error("Error al cargar trabajador:", err);
                mostrarNotificacion("No se pudo cargar el trabajador.", "error");
                setTimeout(() => navigate("/AdministrarTrabajadores"), 2000);
            })
            .finally(() => setCargando(false));
    }, [id, navigate, API_URL]);

    const manejarEnvio = async (datos) => {
        try {
            await axios.patch(`${API_URL}/api/administrador/usuarios/${id}/`, datos);
            mostrarNotificacion("✅ Trabajador actualizado con éxito.", "exito");
            setTimeout(() => navigate("/AdministrarTrabajadores"), 2000);
        } catch (error) {
            console.error("❌ Error al actualizar trabajador:", error.response?.data || error);
            mostrarNotificacion("Error al actualizar el trabajador.", "error");
        }
    };

    const botones = [
        { texto: 'Actualizar', tipo: 'submit', clase: 'guardar', onClick: null },
        { texto: 'Cancelar', tipo: 'button', clase: 'salir', onClick: () => navigate("/AdministrarTrabajadores") }
    ];

    return (
        <div className="contenedor_formulario_inventario">
            {cargando ? (
                <p>Cargando datos del trabajador...</p>
            ) : datosIniciales ? (
                <FormularioAdmin
                    campos={camposTrabajador}
                    valoresIniciales={datosIniciales}
                    onSubmit={manejarEnvio}
                    botonesPersonalizados={botones}
                    validacionesPersonalizadas={{
                        email: (valor) => {
                            if (!valor) return "El correo electrónico es obligatorio";
                            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            return !regex.test(valor) ? "El correo electrónico no es válido" : null;
                        },
                        nombre: (valor) =>
                            !valor || valor.trim().length < 2 ? "El nombre debe tener al menos 2 caracteres" : null,
                        apellido: (valor) =>
                            !valor || valor.trim().length < 2 ? "El apellido debe tener al menos 2 caracteres" : null,
                        telefono: (valor) => {
                            if (!valor) return null;
                            const regex = /^[0-9]{10}$/;
                            return !regex.test(valor) ? "El teléfono debe contener 10 dígitos" : null;
                        }
                    }}
                />
            ) : (
                <p>Error al cargar los datos.</p>
            )}

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
