import React from "react"; 
import TablaBase from "../../components/TablaBase";
import Boton from "../../components/Boton";



export default function HistorialPedidos() {
  // Columnas que se ven en la tabla
  const columnas = ["Pedidos", "Cliente", "Hora y fecha"];

  // Datos falsos simulando los pedidos
  const datos = [
    ["26263", "José Muñoz" ,"12:05:23 PM - 12/02/2025" ],
    ["34562", "Luisa Ortiz" ,"01:25:53 PM - 08/03/2025"],
    ["598941", "María Cano" ,"03:53:08 PM - 20/05/2025" ],
    ["346757", "Daniela Arboleda","06:38:08 PM - 25/06/2025" ],
    ["347274", "Camila Jimenez" ,"09:43:54 AM - 02/09/2025" ],

  ];

  return (
    <div >
      {/* Título centrado */}
      <h2 className="titulo">HISTORIAL DE PEDIDOS</h2>
      <TablaBase columnas={columnas} datos={datos} />
    </div>
  );
};
