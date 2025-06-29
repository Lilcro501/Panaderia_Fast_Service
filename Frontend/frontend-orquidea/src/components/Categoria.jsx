import "../assets/styles/Categoria.css";
import React, { useState } from "react";
import HeartButton from "./Corazon";
import { useCarrito } from "../Context/CarritoContext";

const Categoria = ({ nombre, productos }) => {
  const { agregarProducto } = useCarrito();
  const [popup, setPopup] = useState(null);

  const manejarAgregar = (producto) => {
    agregarProducto(producto);
    setPopup(producto.nameProduct);

    // Ocultar ventana después de 2 segundos
    setTimeout(() => setPopup(null), 2000);
  };

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
                  onClick={() => manejarAgregar(producto)}
                >
                  Añadir
                </button>
                <HeartButton />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mini ventana emergente */}
      {popup && (
        <div className="popup-mini">
          ✅ {popup} añadido al carrito
        </div>
      )}
    </div>
  );
};

export default Categoria;

