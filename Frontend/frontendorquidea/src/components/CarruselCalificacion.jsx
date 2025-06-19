import React, { useRef } from "react";
import panTrenza from "../assets/images/panes/pan trenza.jpg";
import almojabana from "../assets/images/panes/almojabana.jpg";
import panAgridulce from "../assets/images/panes/pan agridulce.jpg";
import rollos from "../assets/images/panes/rollos.jpg";
import panLleno from "../assets/icons/Pan2.png";
import panVacio from "../assets/icons/Pan1.png";
import "../assets/styles/CarruselCalificacion.css"


export default function CarruselDestacados() {
  const destacadosRef = useRef(null);

  const productos = [
    {
      nombre: "Pan trenza",
      imagen: panTrenza,
      calificacion: [panLleno, panLleno, panLleno, panLleno, panVacio],
    },
    {
      nombre: "Almojabana",
      imagen: almojabana,
      calificacion: [panLleno, panLleno, panLleno, panLleno, panVacio],
    },
    {
      nombre: "Pan agridulce",
      imagen: panAgridulce,
      calificacion: [panLleno, panLleno, panLleno, panLleno, panVacio],
    },
    {
      nombre: "Rollos",
      imagen: rollos,
      calificacion: [panLleno, panLleno, panLleno, panLleno, panVacio],
    },
    {
      nombre: "Pan trenza",
      imagen: panTrenza,
      calificacion: [panLleno, panLleno, panLleno, panVacio, panVacio],
    },
    {
      nombre: "Almojabana",
      imagen: almojabana,
      calificacion: [panLleno, panLleno, panLleno, panVacio, panVacio],
    },
    {
      nombre: "Pan agridulce",
      imagen: panAgridulce,
      calificacion: [panLleno, panLleno, panLleno, panLleno, panVacio],
    },
    {
      nombre: "Rollos",
      imagen: rollos,
      calificacion: [panLleno, panLleno, panVacio, panVacio, panVacio],
    },
  ];

  const scroll = (offset) => {
    if (destacadosRef.current) {
      destacadosRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="contenedor-carrusel-centralizado">
      <button
        className="btn-carrusel"
        onClick={() => scroll(-300)}
        aria-label="Anterior destacados"
      >
        &#10094;
      </button>

      <div className="catalogo-scroll" ref={destacadosRef}>
        {productos.map((prod, index) => (
          <div className="recuadro-destacados" key={index}>
            <img className="destacado" src={prod.imagen} alt={prod.nombre} />
            <p>{prod.nombre}</p>
            <span>
              {prod.calificacion.map((icono, i) => (
                <img
                  key={i}
                  className="calificacion"
                  src={icono}
                  width="25"
                  height="25"
                  alt="calificación"
                />
              ))}
            </span>
          </div>
        ))}
      </div>

      <button
        className="btn-carrusel"
        onClick={() => scroll(300)}
        aria-label="Siguiente destacados"
      >
        &#10095;
      </button>
    </section>
  );
}
