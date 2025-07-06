import React, { useRef, useState } from "react";
import "../assets/styles/CarruselIncremento.css";
import { useCarrito } from "../Context/CarritoContext";

import panTrenza from "../assets/images/panes/pan trenza.jpg";
import almojabana from "../assets/images/panes/almojabana.jpg";
import panAgridulce from "../assets/images/panes/pan agridulce.jpg";
import rollos from "../assets/images/panes/rollos.jpg";

export default function CarruselCatalogo() {
  const contenedorRef = useRef(null);
  const { agregarProducto } = useCarrito(); // 🛒 usar contexto de carrito

  const productos = [
    { id: 1, nameProduct: "Pan trenza", price: 2500, image: panTrenza },
    { id: 2, nameProduct: "Almojabana", price: 1500, image: almojabana },
    { id: 3, nameProduct: "Pan agridulce", price: 1500, image: panAgridulce },
    { id: 4, nameProduct: "Rollos", price: 2800, image: rollos },
    { id: 4, nameProduct: "Rollos", price: 2800, image: rollos },
    { id: 4, nameProduct: "Rollos", price: 2800, image: rollos },
    { id: 4, nameProduct: "Rollos", price: 2800, image: rollos }
  ];

  const [cantidades, setCantidades] = useState(Array(productos.length).fill(0));

  const scroll = (offset) => {
    contenedorRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  const incrementar = (index) => {
    const producto = productos[index];
    const nuevasCantidades = [...cantidades];
    nuevasCantidades[index] += 1;
    setCantidades(nuevasCantidades);
    agregarProducto(producto); // 🛒 agregar al carrito
  };

  const disminuir = (index) => {
    const nuevasCantidades = [...cantidades];
    nuevasCantidades[index] = Math.max(0, nuevasCantidades[index] - 1);
    setCantidades(nuevasCantidades);
    // Puedes llamar eliminarProducto(producto.id) si lo deseas aquí.
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
          <div className="recuadro-catalogo" key={prod.id}>
            <img
              className="carrusel-catalogo"
              src={prod.image}
              alt={prod.nameProduct}
            />
            <p>
              {prod.nameProduct}
              <br />${prod.price}
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
