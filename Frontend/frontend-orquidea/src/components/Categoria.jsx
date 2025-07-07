import "../assets/styles/Categoria.css";
import React, { useState } from "react";
import HeartButton from "./Corazon";
import { useCarrito } from "../Context/CarritoContext";
import { Link } from "react-router-dom"; // ⬅️ IMPORTANTE

const Categoria = ({ nombre, productos }) => {
  const { agregarProducto } = useCarrito();
  const [popup, setPopup] = useState(null);

  const manejarAgregar = (producto) => {
    agregarProducto(producto);
    setPopup(producto.nameProduct);

    setTimeout(() => setPopup(null), 2000);
  };

  return (
    <div className="categoria-seccion">
      {nombre && <h2 className="categoria-titulo">{nombre}</h2>}
      <div className="categoria-grid">
        {productos.map((producto, index) => (
          <div key={index} className="producto-tarjeta">
            <Link to={`/producto/${producto.id}`} className="link-producto">
              <img
                src={producto.image}
                alt={producto.nameProduct}
                className="producto-imagen"
              />
            </Link>
            <div className="producto-info">
              <Link to={`/producto/${producto.id}`} className="link-producto">
                <p className="producto-nombre">{producto.nameProduct}</p>
              </Link>
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
