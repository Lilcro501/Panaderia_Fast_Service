// src/components/CarruselIncremento.jsx

import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/CarruselIncremento.css";
import datos from "../Data/data"; // Asegúrate que `datos` sea igual a `productCategories`

export default function CarruselCatalogo() {
  const contenedorRef = useRef(null);

  const idsProductos = [
    "pan1", "pan2", "pan8", "pan11", "pan5", "pan4", // panes
    "m2", "m1", "m4", "m6",                         // mecato
    "b3", "b4"                                      // bebidas
  ];

  // Buscar el producto según ID recorriendo todas las categorías
  const buscarProducto = (id) => {
    for (const categoria of Object.values(datos)) {
      const encontrado = categoria.find(p => p.id === id);
      if (encontrado) return encontrado;
    }
    return null;
  };

  const productos = idsProductos.map(buscarProducto).filter(Boolean);
  const [cantidades, setCantidades] = useState(Array(productos.length).fill(0));

  const scroll = (offset) => {
    if (contenedorRef.current) {
      contenedorRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const incrementar = (index) => {
    const nuevas = [...cantidades];
    nuevas[index] += 1;
    setCantidades(nuevas);
  };

  const disminuir = (index) => {
    const nuevas = [...cantidades];
    nuevas[index] = Math.max(0, nuevas[index] - 1);
    setCantidades(nuevas);
  };

  return (
    <section className="carrusel-centralizado">
      <button className="boton-carrusel" onClick={() => scroll(-300)}>
        &#10094;
      </button>

      <div className="catalogo-deslizar" ref={contenedorRef}>
        {productos.map((prod, index) => (
          <div className="recuadro-catalogo" key={prod.id}>
            <Link to={`/producto/${prod.id}`} className="enlace-producto">
              <img className="carrusel-catalogo" src={prod.image} alt={prod.nameProduct} />
              <div className="P">
                {prod.nameProduct}
                <br />${prod.price.toLocaleString()}
              </div>
            </Link>

            <section className="number-input">
              <button className="disminucion" onClick={() => disminuir(index)}>−</button>
              <input type="number" value={cantidades[index]} readOnly />
              <button className="incremento" onClick={() => incrementar(index)}>+</button>
            </section>
          </div>
        ))}
      </div>

      <button className="boton-carrusel" onClick={() => scroll(300)}>
        &#10095;
      </button>
    </section>
  );
}
