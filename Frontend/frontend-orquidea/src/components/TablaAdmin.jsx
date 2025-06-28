import React from "react";
//importar rutas
import { Link } from "react-router-dom";
import "../assets/styles/TablaAdmin.css";

const TablaAdmin = ({ encabezados, filas }) => {
    return (
        <main>
            <div className="Tabla-5c">
                <table>
                    <thead>
                        <tr>
                            {encabezados.map((titulo, i) => (
                                <th key={i}>{titulo}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filas.map((fila, i) => (
                            <tr key={i}>
                                {fila.map((celda, j) => (
                                    <td key={j}>{celda}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};
export default TablaAdmin;