import "../assets/styles/Categoria.css";
import React from 'react';
import HeartButton from './Corazon';
//import { useCarrito } from "../Context/CarritoContext"; // 👈 importar hook

const Categoria = ({ nombre, productos }) => {
  const { agregarProducto } = useCarrito(); // 👈 usar función para agregar

  return (
    <div className="categoria-seccion">
      {nombre && <h2 className="categoria-titulo">{nombre}</h2>}
      <div className="categoria-grid">
        {productos.map((producto, index) => (
          <div key={index} className="producto-tarjeta">
            <img
              src={producto.image}
              alt={producto.nameProduct}
              className="producto-imagen"
            />
            <div className="producto-info">
              <p className="producto-nombre">{producto.nameProduct}</p>
              <p className="producto-precio">${producto.price}</p>
              <div className="acomodar-corazon-agregar">
                <button
                  className="agregar"
                  onClick={() => agregarProducto(producto)} // 👈 agregar al carrito
                >
                  Añadir
                </button>
                <HeartButton />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categoria;
