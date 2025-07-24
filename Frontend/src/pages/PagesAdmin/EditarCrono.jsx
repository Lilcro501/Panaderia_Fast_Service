import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormularioAdmin from '../../components/FormularioAdmin';
import "../../assets/styles/Global.css";

export default function EditarCrono() {
    const { id } = useParams(); // ID del cronograma desde la URL
    const navigate = useNavigate();

    const [datosIniciales, setDatosIniciales] = useState(null);

    const formatearFecha = (fecha) => {
        if (!fecha) return '';
        const date = new Date(fecha);
        return date.toISOString().slice(0, 16); // formato para <input type="datetime-local" />
    };

    const camposProducto = [
        {
            nombre: 'nombre',
            etiqueta: 'Nombre Completo',
            tipo: 'text',
            requerido: false,
            deshabilitado: true
        },
        {
            nombre: 'titulo',
            etiqueta: 'Cargo',
            tipo: 'text',
            requerido: true
        },
        {
            nombre: 'descripcion',
            etiqueta: 'Actividades',
            tipo: 'textarea',
            requerido: true
        },
        {
            nombre: 'fecha_inicio',
            etiqueta: 'Fecha y hora de inicio',
            tipo: 'datetime-local',
            requerido: true
        },
        {
            nombre: 'fecha_fin',
            etiqueta: 'Fecha y hora de fin',
            tipo: 'datetime-local',
            requerido: true
        }
    ];

    const manejarEnvio = async (datos) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/cronograma/${id}/`);
            const idUsuario = response.data.id_usuario;

            const payload = {
                id_usuario: idUsuario,
                titulo: datos.titulo,
                descripcion: datos.descripcion,
                fecha_inicio: datos.fecha_inicio,
                fecha_fin: datos.fecha_fin
            };

            console.log("Datos enviados al backend:", payload);

            await axios.put(`http://localhost:8000/api/cronograma/${id}/`, payload);

            alert("Cronograma actualizado correctamente.");
            navigate('/Cronograma');
        } catch (error) {
            console.error("Error al actualizar cronograma:", error);
            alert("Ocurrió un error al actualizar el cronograma.");
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
                navigate('/Cronograma');
            }
        }
    ];

    useEffect(() => {
        axios.get(`http://localhost:8000/api/cronograma/${id}/`)
            .then(response => {
                const data = response.data;
                const usuario = data.usuario_detalle || {};

                setDatosIniciales({
                    nombre: `${usuario.nombre || ''} ${usuario.apellido || ''}`,
                    titulo: data.titulo || '',
                    descripcion: data.descripcion || '',
                    fecha_inicio: formatearFecha(data.fecha_inicio),
                    fecha_fin: formatearFecha(data.fecha_fin)
                });
            })
            .catch(error => {
                console.error("Error al obtener cronograma:", error);
            });
    }, [id]);

    return (
        <div className="contenedor_formulario_inventario">
            {datosIniciales && (
                <FormularioAdmin
                    campos={camposProducto}
                    onSubmit={manejarEnvio}
                    botonesPersonalizados={botones}
                    valoresIniciales={datosIniciales}
                />
            )}
        </div>
    );
}
