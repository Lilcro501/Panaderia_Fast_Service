import React from "react";
import "../assets/styles/tabla.css"; // Estilos generales para todas las tablas

// Este componente se puede usar para muchas tablas distintas
function TablaBase({ columnas, datos }) {
  return (
    <table>
      <thead>
        <tr className="tr">
          {columnas.map((c, i) => <th key={i}>{c}</th>)}
        </tr>
      </thead>
      <tbody>
        {datos.map((fila, i) => (
          <tr className="tr" key={i}>
            {fila.map((celda, j) => <td key={j}>{celda}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablaBase;
