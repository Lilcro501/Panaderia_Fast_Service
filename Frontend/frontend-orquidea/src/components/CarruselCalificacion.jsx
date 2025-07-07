import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import breadIcon from "@iconify-icons/mdi/bread";
import productCategories from "../Data/data.js"
import "../assets/styles/CarruselCalificacion.css";

export default function CarruselCalificacion() {
  const calificacionRef = useRef(null);

  // Lista de IDs de productos que quieres mostrar
  const productosFiltrados = [
    "pan1", "pan2", "pan3", "pan4", "pan5", "pan7", "pan8", "pan9", "pan10", "pan11"
  ];

  // Extrae solo los productos de la categoría "panes" que coincidan con los IDs anteriores
  const productos = productCategories.panes
    .filter(producto => productosFiltrados.includes(producto.id));

  const scroll = (offset) => {
    if (calificacionRef.current) {
      calificacionRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="contenedor-carrusel-centralizado">
      <button className="btn-carrusel" onClick={() => scroll(-300)}>&#10094;</button>

      <div className="catalogo-scroll" ref={calificacionRef}>
        {productos.map((prod) => (
          <div className="recuadro-destacados" key={prod.id}>
            <Link to={`/producto/${prod.id}`} className="link-producto">
              <img className="destacado" src={prod.image} alt={prod.nameProduct} />
            </Link>
            <Link to={`/producto/${prod.id}`} className="link-producto">
              <p className="P">{prod.nameProduct}</p>
            </Link>
            <span>
              {[...Array(3)].map((_, i) => (
                <Icon
                  key={`filled-${i}`}
                  icon={breadIcon}
                  width="25"
                  style={{ marginRight: "5px" }}
                />
              ))}
              {[...Array(2)].map((_, i) => (
                <Icon
                  key={`empty-${i}`}
                  icon={breadIcon}
                  width="25"
                  style={{ marginRight: "5px", color: "gray" }}
                />
              ))}
            </span>
          </div>
        ))}
      </div>

      <button className="btn-carrusel" onClick={() => scroll(300)}>&#10095;</button>
    </section>
  );
}
