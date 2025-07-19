import "../assets/styles/Categoria.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import HeartButton from "./Corazon";
import { useCarrito } from "../Context/CarritoContext";
import { Link } from "react-router-dom";

const Categoria = ({ nombre }) => {
  const { agregarProducto, carrito } = useCarrito();
  const [productos, setProductos] = useState([]);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const nombreFormateado = nombre.toLowerCase();
    axios
      .get(`http://localhost:8000/api/productos/${nombreFormateado}/`)
      .then((res) => {
        const productosFormateados = res.data.map((producto) => ({
          id: producto.id,
          nameProduct: producto.nombre,
          price: producto.precio,
          image: `http://localhost:8000${producto.imagen}`,
          description: producto.descripcion,
          stock: producto.stock, // ✅ Importante para control
        }));

        setProductos(productosFormateados);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
      });
  }, [nombre]);

  const manejarAgregar = (producto) => {
    const productoEnCarrito = carrito.find((item) => item.id === producto.id);
    const cantidadActual = productoEnCarrito ? productoEnCarrito.quantity : 0; // ✅ corregido

    if (cantidadActual < producto.stock) {
      agregarProducto(producto);
      setPopup(producto.nameProduct);
      setTimeout(() => setPopup(null), 2000);
    } else {
      alert(
        `⚠️ No puedes agregar más de ${producto.stock} unidades de ${producto.nameProduct}`
      );
    }
  };

  return (
    <div className="categoria-seccion">
      <div className="centrar-titulo">
        {nombre && <h2 className="categoria-titulo">{nombre}</h2>}
      </div>

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
              <p className="producto-stock">
                Disponibles: {producto.stock}
              </p>
              <div className="acomodar-corazon-agregar">
                <button
                  className="agregar"
                  onClick={() => manejarAgregar(producto)}
                  disabled={producto.stock === 0}
                >
                  {producto.stock === 0 ? "Agotado" : "Añadir"}
                </button>

                <HeartButton
                  producto={{
                    id: producto.id,
                    nameProduct: producto.nameProduct,
                    price: producto.price,
                    image: producto.image,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {popup && (
        <div className="popup-mini">✅ {popup} añadido al carrito</div>
      )}
    </div>
  );
};

export default Categoria;
