
import React from 'react';
import "../assets/styles/Categoria.css";

const Categoria = ({ nombre, productos }) => {
  return (
    <div className="categoria-seccion">
      {nombre && <h2 className="categoria-titulo">{nombre}</h2>}
      <div className="categoria-grid">
        {productos.map((producto, index) => (
          <div key={index} className="producto-tarjeta">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="producto-imagen"
            />
            <div className="producto-info">
              <p className="producto-nombre">{producto.nombre}</p>
              <p className="producto-precio">${producto.precio}</p>
              <button className="agregar">Añadir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categoria;
