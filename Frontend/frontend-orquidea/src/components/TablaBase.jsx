// TablaBase.jsx
import React from "react";
import "./tabla.css"; // Estilos generales para todas las tablas

// Este componente se puede usar para muchas tablas distintas
const TablaBase = ({ columnas, datos, children }) => {
  return (
    <table className="tabla">
      <thead>
        <tr>
          {columnas.map((col, i) => (
            <th key={i}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {datos.map((fila, index) => (
          <tr key={index}>
            {fila.map((valor, i) => (
              <td key={i}>{valor}</td>
            ))}
          </tr>
        ))}
        {children}
      </tbody>
    </table>
  );
};

export default TablaBase;
