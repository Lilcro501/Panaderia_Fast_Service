import React from "react";
import TablaBase from "../../components/TablaBase";
import EtiquetaPago from "../../components/EtiquetaPago";


const DetallesPedido = () => {
  // Columnas de la tabla
  const columnas = ["Producto", "Cantidad", "Precio unitario", "Precio total"];

  const datos = [
    ["Pan trenza", "2", "$$$", "$$$$$"],
    ["Pan agridulce", "5", "$$", "$$$$$"],
    ["Pera", "1", "$", "$$$"],
    ["Rollo", "3", "$$$", "$$$$"],
    ["Churro", "4", "$$", "$$$$"],
  ];

  return (
    <div className="contenedor-detalles">
      <h2 className="titulo">Detalles del pedido</h2>

      {/* Tabla con la información del pedido */}
      <TablaBase columnas={columnas} datos={datos} />

      {/* Sección de pago al final */}
      <div className="pago-seccion">
        <EtiquetaPago texto="Pagado" />
        <EtiquetaPago texto="Total: $$$$" />
      </div>
    </div>
  );
};

export default DetallesPedido;
