import React, { useRef, useState } from "react";
import panTrenza from "../assets/images/panes/pan trenza.jpg";
import almojabana from "../assets/images/panes/almojabana.jpg";
import panAgridulce from "../assets/images/panes/pan agridulce.jpg";
import rollos from "../assets/images/panes/rollos.jpg";
import panLleno from "../assets/icons/Pan2.png";
import panVacio from "../assets/icons/Pan1.png";
import "../assets/styles/CarruselCalificacion.css";

export default function CarruselDestacados() {
  const destacadosRef = useRef(null);

  const productos = [
    { id: 1, nombre: "Pan trenza", imagen: panTrenza },
    { id: 2, nombre: "Almojabana", imagen: almojabana },
    { id: 3, nombre: "Pan agridulce", imagen: panAgridulce },
    { id: 4, nombre: "Rollos", imagen: rollos },
        { id: 4, nombre: "Rollos", imagen: rollos },
            { id: 4, nombre: "Rollos", imagen: rollos }
  ];

  const [calificaciones, setCalificaciones] = useState({});

  const handleCalificacion = (productoId, nivel) => {
    setCalificaciones((prev) => ({
      ...prev,
      [productoId]: nivel,
    }));
  };

  const scroll = (offset) => {
    destacadosRef.current?.scrollBy({ left: offset, behavior: "smooth" });
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
        {productos.map((prod) => {
          const rating = calificaciones[prod.id] || 0;

          return (
            <div className="recuadro-destacados" key={prod.id}>
              <img className="destacado" src={prod.imagen} alt={prod.nombre} />
              <p>{prod.nombre}</p>
              <span className="contenedor-calificacion">
                {[1, 2, 3, 4, 5].map((nivel) => (
                  <img
                    key={nivel}
                    src={nivel <= rating ? panLleno : panVacio}
                    alt={`Pan ${nivel}`}
                    className="calificacion"
                    width="25"
                    height="25"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCalificacion(prod.id, nivel)}
                  />
                ))}
              </span>
            </div>
          );
        })}
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
