import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../api/authservice";

import "../../assets/styles/Global.css";
import "../../assets/styles/CronogramaTrabajador.css"; // estilos solo para esta tabla

export default function CronogramaTrabajador() {
    const [cronogramas, setCronogramas] = useState([]);
    const id_usuario = localStorage.getItem("id_usuario");

    const obtenerCronogramas = async () => {
        const token = getAccessToken();

        if (!token || !id_usuario) {
            console.error("Token o id de usuario no encontrado, debes iniciar sesión");
            return;
        }

        try {
            const response = await axios.get(
                `http://localhost:8000/api/trabajador/cronograma/${id_usuario}/`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setCronogramas(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                console.error("Token expirado o inválido, debe iniciar sesión nuevamente");
            } else {
                console.error("Error al obtener cronogramas:", error);
            }
        }
    };

    useEffect(() => {
        obtenerCronogramas();
    }, []);

    return (
        <main className="cronograma-trabajador">
            <h2>Mi Cronograma</h2>
            <div className="tabla-cronograma">
                <table>
                    <thead>
                        <tr>
                            <th>Id Usuario</th>
                            <th>Título</th>
                            <th>Descripción</th>
                            <th>Horario</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cronogramas.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id_usuario}</td>
                                <td>{item.titulo}</td>
                                <td>{item.descripcion}</td>
                                <td>{item.hora_inicio} - {item.hora_fin}</td>
                                <td>{item.fecha}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
