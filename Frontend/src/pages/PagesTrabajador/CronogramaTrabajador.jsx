import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TablaAdmin from '../../components/TablaAdmin';

import "../../assets/styles/Global.css";

export default function CronogramaTrabajador() {
    const encabezados = ['Id','Nombre trabajador', 'Cargo', 'Actividades', 'Horarios', 'Fecha'];
    const [filas, setFilas] = useState([]);

    const obtenerCronogramas = () => {
        const id_usuario = localStorage.getItem("id_usuario"); // o de donde lo saques

        axios.get(`http://localhost:8000/api/trabajador/cronograma/${id_usuario}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // si usas JWT
            }
        })
        .then(response => {
            const cronogramas = response.data;

            const filasConvertidas = cronogramas.map(item => {
                const horario = `${item.hora_inicio} - ${item.hora_fin}`;
                const fecha = item.fecha;
                const nombreCompleto = item.nombre_completo || "—";

                return [
                    nombreCompleto,
                    item.titulo || '—',
                    item.descripcion || '—',
                    horario,
                    fecha,
                ];
            });

            setFilas(filasConvertidas);
        })
        .catch(error => {
            console.error("Error al cargar cronogramas del trabajador:", error);
        });
    }; // 👈 aquí cerramos correctamente la función

    useEffect(() => {
        obtenerCronogramas();
    }, []);

    return (
        <>
            <div>
                <h2 className="titulo_seccion">Mi Cronograma</h2>
                <TablaAdmin encabezados={encabezados} filas={filas} />
                <br />
            </div>
        </>
    );
}
