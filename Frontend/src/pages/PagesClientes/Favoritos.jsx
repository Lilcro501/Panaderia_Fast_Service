import React from "react";
import { useFavoritos } from "../../Context/FavoritosContext";
import { useCarrito } from "../../Context/CarritoContext";
import Corazon from "../../components/Corazon";
import { Link } from "react-router-dom";
import "../../assets/styles/Categoria.css";

const Favoritos = () => {
  const { favoritos } = useFavoritos();
  const { agregarProducto, carrito } = useCarrito();

  const manejarAgregar = (producto) => {
    const productoEnCarrito = carrito.find((item) => item.id === producto.id_producto);
    const cantidadActual = productoEnCarrito ? productoEnCarrito.quantity : 0;

    if (cantidadActual < producto.stock) {
      agregarProducto({
        id: producto.id_producto,
        nameProduct: producto.nombre,
        price: producto.precio,
        image: producto.imagen.startsWith("http")
          ? producto.imagen
          : `http://localhost:8000${producto.imagen}`,
        description: producto.descripcion,
        stock: producto.stock,
      });
    } else {
      alert(`⚠️ No puedes agregar más de ${producto.stock} unidades de ${producto.nombre}`);
    }
  };

  return (
    <div className="categoria-seccion">
      <div className="centrar-titulo">
        <h2 className="categoria-titulo">Favoritos</h2>
      </div>

      <div className="categoria-grid">
        {favoritos.length === 0 ? (
          <p>No tienes productos favoritos todavía.</p>
        ) : (
          favoritos.map((favorito, index) => {
            const producto = favorito.producto_detalle || favorito.producto;

            // Validar si el producto o su imagen no están definidos
            if (!producto || !producto.imagen) {
              return null; // O puedes mostrar un mensaje alternativo aquí
            }

            const imagenSrc = producto.imagen.startsWith("http")
              ? producto.imagen
              : `http://localhost:8000${producto.imagen}`;

            return (
              <div key={index} className="producto-tarjeta">
                <Link to={`/producto/${producto.id_producto}`}>
                  <img
                    src={imagenSrc}
                    alt={producto.nombre}
                    className="producto-imagen"
                  />
                </Link>

                <div className="producto-info">
                  <Link to={`/producto/${producto.id_producto}`} className="link-producto">
                    <p className="producto-nombre">{producto.nombre}</p>
                  </Link>
                  <p className="producto-precio">${producto.precio}</p>
                  <p className="producto-stock">Disponible</p>
                  <div className="acomodar-corazon-agregar">
                    <button className="agregar" onClick={() => manejarAgregar(producto)}>
                      Añadir
                    </button>
                    <Corazon productoId={producto.id_producto} />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Favoritos;
