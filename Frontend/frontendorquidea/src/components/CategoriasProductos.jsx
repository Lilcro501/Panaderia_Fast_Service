import React from "react";

import PanAgriduclce from "../assets/images/panes/pan agridulce.jpg"


export default function CategoriaProductos() {
    return (
        <div className="recuadro-catalogo">
            <img 
                className="carrusel-catalogo" 
                src={PanAgriduclce} 
                alt="Pan agridulce" 
            />
            <div className="contenido-producto">
                <h3>Pan agridulce</h3>
                <p className="precio">$1500</p>
                <section className="number-input" aria-label="Control para añadir producto">
                    <button id="añadirProducto" type="button">
                        Añadir
                    </button>
                </section>
            </div>
        </div>
    );
}