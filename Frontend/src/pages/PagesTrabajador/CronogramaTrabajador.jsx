import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../api/authservice";

import "../../assets/styles/Global.css";
import "../../assets/styles/CronogramaTrabajador.css";

export default function CronogramaTrabajador() {
  const [cronogramas, setCronogramas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const id_usuario = sessionStorage.getItem("id_usuario");

  const API_URL = import.meta.env.VITE_API_URL; // <-- variable de entorno

  const obtenerCronogramas = async () => {
    const token = getAccessToken();

    if (!token || !id_usuario) {
      console.error("Token o id de usuario no encontrado, debes iniciar sesión");
      setCargando(false);
      return;
    }

    try {
      const response = await axios.get(
        `${API_URL}/api/trabajador/cronograma/${id_usuario}/`,
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
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerCronogramas();
  }, []);

  return (
    <main className="cronograma-trabajador">
      <h1 className="titulo">Mi Cronograma</h1>

      {cargando ? (
        <p>Cargando cronogramas...</p>
      ) : cronogramas.length === 0 ? (
        <p>No hay cronogramas disponibles</p>
      ) : (
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
              {cronogramas.map((item) => (
                <tr key={item.id || `${item.id_usuario}-${item.fecha}`}>
                  <td data-label="Id Usuario">{item.id_usuario}</td>
                  <td data-label="Título">{item.titulo}</td>
                  <td data-label="Descripción">{item.descripcion}</td>
                  <td data-label="Horario">{item.hora_inicio} - {item.hora_fin}</td>
                  <td data-label="Fecha">{new Date(item.fecha).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
