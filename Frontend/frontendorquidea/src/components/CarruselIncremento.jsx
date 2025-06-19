import React, { useRef, useState } from "react";
import "../assets/styles/CarruselIncremento.css"
import panTrenza from "../assets/images/panes/pan trenza.jpg";
import almojabana from "../assets/images/panes/almojabana.jpg";
import panAgridulce from "../assets/images/panes/pan agridulce.jpg";
import rollos from "../assets/images/panes/rollos.jpg";

export default function CarruselCatalogo() {
  const contenedorRef = useRef(null);

  const productos = [
    { nombre: "Pan trenza", precio: 2500, imagen: panTrenza },
    { nombre: "Almojabana", precio: 1500, imagen: almojabana },
    { nombre: "Pan agridulce", precio: 1500, imagen: panAgridulce },
    { nombre: "Rollos", precio: 2800, imagen: rollos },
    { nombre: "Pan trenza", precio: 2500, imagen: panTrenza },
    { nombre: "Pan trenza", precio: 2500, imagen: panTrenza },
  ];

  // Estado para cantidades: un array de ceros, uno por producto
  const [cantidades, setCantidades] = useState(Array(productos.length).fill(0));

  const scroll = (offset) => {
    if (contenedorRef.current) {
      contenedorRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const incrementar = (index) => {
    const nuevasCantidades = [...cantidades];
    nuevasCantidades[index] += 1;
    setCantidades(nuevasCantidades);
  };

  const disminuir = (index) => {
    const nuevasCantidades = [...cantidades];
    nuevasCantidades[index] = Math.max(0, nuevasCantidades[index] - 1);
    setCantidades(nuevasCantidades);
  };

  return (
    <section className="carrusel-centralizado">
      <button
        className="boton-carrusel"
        onClick={() => scroll(-300)}
        aria-label="Anterior catálogo"
      >
        &#10094;
      </button>

      <div className="catalogo-deslizar" ref={contenedorRef}>
        {productos.map((prod, index) => (
          <div className="recuadro-catalogo" key={index}>
            <img
              className="carrusel-catalogo"
              src={prod.imagen}
              alt={prod.nombre}
            />
            <p>
              {prod.nombre}
              <br />${prod.precio}
            </p>
            <section className="number-input" aria-label="Control de número">
              <button
                type="button"
                className="disminucion"
                onClick={() => disminuir(index)}
              >
                −
              </button>
              <input
                type="number"
                value={cantidades[index]}
                readOnly
                aria-live="polite"
              />
              <button
                type="button"
                className="incremento"
                onClick={() => incrementar(index)}
              >
                +
              </button>
            </section>
          </div>
        ))}
      </div>

      <button
        className="boton-carrusel"
        onClick={() => scroll(300)}
        aria-label="Siguiente catálogo"
      >
        &#10095;
      </button>
    </section>
  );
}
