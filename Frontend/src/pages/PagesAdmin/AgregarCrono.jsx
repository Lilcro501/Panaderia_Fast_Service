import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormularioAdmin from '../../components/FormularioAdmin';
import "../../assets/styles/Global.css";

export default function AgregarCrono() {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [notificacion, setNotificacion] = useState({
        visible: false,
        mensaje: "",
        tipo: ""
    });

    const mostrarNotificacion = (mensaje, tipo) => {
        setNotificacion({ visible: true, mensaje, tipo });
        setTimeout(() => setNotificacion({ visible: false, mensaje: "", tipo: "" }), 2000);
    };

    useEffect(() => {
        axios.get('http://localhost:8000/api/administrador/usuarios/')
            .then(response => {
                const trabajadoresFiltrados = response.data.filter(usuario => usuario.rol === "trabajador");
                const opciones = trabajadoresFiltrados.map(usuario => ({
                    valor: usuario.id_usuario.toString(),
                    etiqueta: `${usuario.nombre} ${usuario.apellido}`
                }));
                setUsuarios(opciones);
            })
            .catch(error => {
                console.error("Error al obtener trabajadores:", error);
                mostrarNotificacion("❌ Error al cargar trabajadores", "error");
            });
    }, []);

    const camposFormulario = [
        { nombre: 'id_usuario', etiqueta: 'Trabajador', tipo: 'select', requerido: true, opciones: usuarios },
        { nombre: 'titulo', etiqueta: 'Cargo', tipo: 'text', requerido: true },
        { nombre: 'descripcion', etiqueta: 'Actividades', tipo: 'textarea', requerido: true },
        { nombre: 'fecha_inicio', etiqueta: 'Fecha y hora de inicio', tipo: 'datetime-local', requerido: true },
        { nombre: 'fecha_fin', etiqueta: 'Fecha y hora de fin', tipo: 'datetime-local', requerido: true }
    ];

    const manejarEnvio = async (datos) => {
        try {
            const datosAEnviar = {
                id_usuario: parseInt(datos.id_usuario, 10),
                titulo: datos.titulo,
                descripcion: datos.descripcion,
                fecha_inicio: new Date(datos.fecha_inicio).toISOString(),
                fecha_fin: new Date(datos.fecha_fin).toISOString()
            };

            await axios.post("http://localhost:8000/api/administrador/cronograma/", datosAEnviar);

            mostrarNotificacion("✅ Cronograma guardado correctamente", "exito");
            setTimeout(() => navigate("/Cronograma"), 2000);
        } catch (error) {
            console.error("Error al guardar cronograma:", error.response?.data || error.message);
            mostrarNotificacion("❌ Error al guardar el cronograma", "error");
        }
    };

    const botones = [
        { texto: 'Aceptar', tipo: 'submit', clase: 'guardar' },
        { texto: 'Cancelar', tipo: 'button', clase: 'salir', onClick: () => navigate("/Cronograma") }
    ];

    return (
        <div className="contenedor_formulario_inventario">
            <FormularioAdmin
                campos={camposFormulario}
                onSubmit={manejarEnvio}
                botonesPersonalizados={botones}
                validacionesPersonalizadas={{
                    id_usuario: (valor) => !valor ? "Debes seleccionar un trabajador" : null,
                    titulo: (valor) => !valor || valor.trim() === "" ? "El cargo es obligatorio" : null,
                    descripcion: (valor) => !valor || valor.trim().length < 5 ? "Las actividades deben tener al menos 5 caracteres" : null,
                    fecha_inicio: (valor) => {
                        if (!valor) return "La fecha de inicio es obligatoria";
                        const inicio = new Date(valor);
                        return isNaN(inicio.getTime()) ? "La fecha de inicio no es válida" : null;
                    },
                    fecha_fin: (valor, valores) => {
                        if (!valor) return "La fecha de fin es obligatoria";
                        const fin = new Date(valor);
                        const inicio = new Date(valores.fecha_inicio);
                        if (isNaN(fin.getTime())) return "La fecha de fin no es válida";
                        if (inicio && fin <= inicio) return "La fecha de fin debe ser posterior a la de inicio";
                        return null;
                    }
                }}
            />

            {/* Notificación */}
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
