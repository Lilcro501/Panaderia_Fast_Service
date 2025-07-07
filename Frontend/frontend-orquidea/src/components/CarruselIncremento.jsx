// src/components/CarruselIncremento.jsx

import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/CarruselIncremento.css";
import datos from "../Data/DatosProductos"; // Productos reales

export default function CarruselCatalogo() {
  const contenedorRef = useRef(null);

  const productos = [
    datos.panes.find(p => p.id === "pan1"),
    datos.panes.find(p => p.id === "pan2"),
    datos.panes.find(p => p.id === "pan8"),
    datos.panes.find(p => p.id === "pan11"),
    datos.panes.find(p => p.id === "pan5"),
    datos.panes.find(p => p.id === "pan4"),
    datos.mecato.find(p => p.id === "m2"),
    datos.mecato.find(p => p.id === "m1"),
    datos.mecato.find(p => p.id === "m4"),
    datos.mecato.find(p => p.id === "m6"),
    datos.bebidas.find(p => p.id === "b3"),
    datos.bebidas.find(p => p.id === "b4"),

  ].filter(Boolean); // Por si alguno no existe

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
              <p className="P">
                {prod.nameProduct}
                <br />${prod.price}
              </p>
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
