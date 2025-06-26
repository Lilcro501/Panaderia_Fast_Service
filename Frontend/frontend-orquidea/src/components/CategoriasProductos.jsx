import React from "react";
import "../assets/styles/CategoriasProductos.css"
import PanAgriduclce from "../assets/images/panes/pan agridulce.jpg"


export default function CategoriaProductos() {
    return (
        <div className="contenedor-producto ">
            <img 
                className="posicion-img" 
                src={PanAgriduclce} 
                alt="Pan agridulce" 
            />
            <div className="contenido-producto">
                <h6>Pan agridulce</h6>
                <p className="precio">$1500</p>
                <section className="" aria-label="Control para añadir producto">
                    <button className="boton-añadir" id="añadirProducto" type="button">
                        Añadir
                    </button>
                </section>
            </div>
        </div>
    );
}