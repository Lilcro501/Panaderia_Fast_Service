
import React from "react"; 

import { useNavigate } from "react-router-dom";
import TablaBase from "../../components/TablaBase";
import Boton from "../../components/Boton";

export default function HistorialPedidos() {
  const navigate = useNavigate();

  const columnas = ["Pedidos", "Cliente", "Hora y fecha"];

  const datos = [
    ["26263", "José Muñoz", "12:05:23 PM - 12/02/2025"],
    ["34562", "Luisa Ortiz", "01:25:53 PM - 08/03/2025"],
    ["598941", "María Cano", "03:53:08 PM - 20/05/2025"],
    ["346757", "Daniela Arboleda", "06:38:08 PM - 25/06/2025"],
    ["347274", "Camila Jimenez", "09:43:54 AM - 02/09/2025"],
  ];

  return (
    <div className="contenido">
      <h2 className="titulo">Historial de pedidos</h2>
      <TablaBase columnas={columnas} datos={datos} />

      {/* Botón para volver al menú principal */}
      <Boton texto="Volver" onClick={() => navigate('/Inicio')} tipo="boton-personalizado" />
    </div>
  );
}
