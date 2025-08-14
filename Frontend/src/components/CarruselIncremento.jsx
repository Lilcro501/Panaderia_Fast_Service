import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/styles/CarruselIncremento.css";
import { useCarrito } from "../Context/CarritoContext";

export default function CarruselCatalogo() {
  const contenedorRef = useRef(null);
  const { carrito, agregarProducto, quitarProducto, eliminarProducto } = useCarrito();
  const [productos, setProductos] = useState([]);

  const idsProductos = [
    "78", "79", "80", "81", "82",
    "83", "85", "87", "88",
    "89", "90"
  ];

  // Obtener datos del backend para cada ID
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const peticiones = idsProductos.map(id =>
          axios.get(`http://localhost:8000/api/producto/${id}/`).then(res => res.data)
        );
        const resultados = await Promise.all(peticiones);
        const productosFormateados = resultados.map(p => ({
          id: p.id_producto,
          nameProduct: p.nombre,
          price: p.precio,
          description: p.descripcion,
          image: p.imagen ? `http://localhost:8000${p.imagen}` : null,
        }));
        setProductos(productosFormateados);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const obtenerCantidad = (id) => {
    const item = carrito.find(p => p.id === id);
    return item ? item.quantity : 0;
  };

  const scroll = (offset) => {
    if (contenedorRef.current) {
      contenedorRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const cambiarCantidadManual = (e, producto) => {
    const nuevaCantidad = Math.max(0, parseInt(e.target.value) || 0);
    const actual = obtenerCantidad(producto.id);

    if (nuevaCantidad > actual) {
      for (let i = actual; i < nuevaCantidad; i++) agregarProducto(producto);
    } else if (nuevaCantidad < actual) {
      for (let i = actual; i > nuevaCantidad; i--) quitarProducto(producto.id);
    }

    if (nuevaCantidad === 0) eliminarProducto(producto.id);
  };

  return (
    <section className="carrusel-centralizado">
      <button className="boton-carrusel" onClick={() => scroll(-300)}>
        &#10094;
      </button>

      <div className="catalogo-deslizar" ref={contenedorRef}>
        {productos.map((prod) => {
          const cantidad = obtenerCantidad(prod.id);

          return (
            <div className="recuadro-catalogo" key={prod.id}>
              <Link to={`/producto/${prod.id}`} className="enlace-producto">
                <img className="carrusel-catalogo" src={prod.image} alt={prod.nameProduct} />
                <div className="P">
                  {prod.nameProduct}
                  <br />${prod.price.toLocaleString()}
                </div>
              </Link>

              <section className="number-input">
                <button className="disminucion" onClick={() => quitarProducto(prod.id)}>−</button>
                <input
                  type="number"
                  min="0"
                  value={cantidad}
                  onChange={(e) => cambiarCantidadManual(e, prod)}
                />
                <button className="incremento" onClick={() => agregarProducto(prod)}>+</button>
              </section>
            </div>
          );
        })}
      </div>

      <button className="boton-carrusel" onClick={() => scroll(300)}>
        &#10095;
      </button>
    </section>
  );
}
