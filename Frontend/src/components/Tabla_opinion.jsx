import React from 'react';
import '../assets/styles/tabla_opiniones.css'; 
const Tabla_opinion =({ datos}) =>{
  if (datos.length === 0) {
    return <p style= {{textAlign: 'center'}}>No hay opiniones registradas aún</p>
  }

  return (
    <div className="tabla-contenedor">
      <h2>Resumen de Experiencia y Recomendación</h2>
      <table className="tabla-resumen">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Calificación (0-10)</th>
            <th>Percepción del servicio</th>
            <th>Amabilidad</th>
            <th>Calidad del producto</th>
            <th>Agilidad</th>
            <th>Recomendación</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((fila, index) => (
            <tr key={index}>
              <td>{fila.nombre || 'Anónimo'}</td>
              <td>{fila.calificacion}</td>
              <td>{fila.opinionGeneral}</td>
              <td>{fila.amabilidad}</td>
              <td>{fila.calidad}</td>
              <td>{fila.agilidad}</td>
              <td>{fila.recomendacionFinal}</td>
              <td>{fila.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabla_opinion;
