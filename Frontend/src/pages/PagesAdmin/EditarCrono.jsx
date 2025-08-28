import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormularioAdmin from '../../components/FormularioAdmin';
import "../../assets/styles/Global.css";

export default function EditarCrono() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [datosIniciales, setDatosIniciales] = useState(null);
    const [notificacion, setNotificacion] = useState({ visible: false, mensaje: "", tipo: "" });

    const API_URL = import.meta.env.VITE_API_URL; // <-- Variable de entorno

    const mostrarNotificacion = (mensaje, tipo) => {
        setNotificacion({ visible: true, mensaje, tipo });
        setTimeout(() => setNotificacion({ visible: false, mensaje: "", tipo: "" }), 2000);
    };

    const formatearFecha = (fecha) => {
        if (!fecha) return '';
        const date = new Date(fecha);
        return date.toISOString().slice(0, 16);
    };

    const camposFormulario = [
        { nombre: 'titulo', etiqueta: 'Cargo', tipo: 'text', requerido: true },
        { nombre: 'descripcion', etiqueta: 'Actividades', tipo: 'textarea', requerido: true },
        { nombre: 'fecha_inicio', etiqueta: 'Fecha y hora de inicio', tipo: 'datetime-local', requerido: true },
        { nombre: 'fecha_fin', etiqueta: 'Fecha y hora de fin', tipo: 'datetime-local', requerido: true }
    ];

    const manejarEnvio = async (datos) => {
        try {
            const response = await axios.get(`${API_URL}/api/administrador/cronograma/${id}/`);
            const idUsuario = response.data.id_usuario;

            const payload = {
                id_usuario: idUsuario,
                titulo: datos.titulo,
                descripcion: datos.descripcion,
                fecha_inicio: datos.fecha_inicio,
                fecha_fin: datos.fecha_fin
            };

            await axios.put(`${API_URL}/api/administrador/cronograma/${id}/`, payload);

            mostrarNotificacion("✅ Cronograma actualizado correctamente", "exito");
            setTimeout(() => navigate('/Cronograma'), 2000);
        } catch (error) {
            console.error("Error al actualizar cronograma:", error);
            mostrarNotificacion("❌ Error al actualizar el cronograma", "error");
        }
    };

    const botones = [
        { texto: 'Actualizar', tipo: 'submit', clase: 'guardar' },
        { texto: 'Cancelar', tipo: 'button', clase: 'salir', onClick: () => navigate("/Cronograma") }
    ];

    useEffect(() => {
        axios.get(`${API_URL}/api/administrador/cronograma/${id}/`)
            .then(response => {
                const data = response.data;

                setDatosIniciales({
                    titulo: data.titulo || '',
                    descripcion: data.descripcion || '',
                    fecha_inicio: formatearFecha(data.fecha_inicio),
                    fecha_fin: formatearFecha(data.fecha_fin)
                });
            })
            .catch(error => {
                console.error("Error al obtener cronograma:", error);
                mostrarNotificacion("❌ Error al cargar los datos del cronograma", "error");
            });
    }, [id, API_URL]);

    return (
        <div className="contenedor_formulario_inventario">
            <h2 className="titulo_seccion" style={{ textAlign: "center", color:'white' }}>
                Editar cronograma
            </h2>
            {datosIniciales ? (
                <FormularioAdmin
                    campos={camposFormulario}
                    onSubmit={manejarEnvio}
                    botonesPersonalizados={botones}
                    valoresIniciales={datosIniciales}
                    validacionesPersonalizadas={{
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
            ) : (
                <p>Cargando datos del cronograma...</p>
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
