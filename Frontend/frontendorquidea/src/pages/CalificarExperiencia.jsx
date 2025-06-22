import React from "react";
import { Link } from 'react-router-dom';
import "../assets/styles/Experiencia.css"
import RecuadroEncuesta from "../components/CompoEncuesExperiencia"
import CalificacionInformacion from "../components/CalificacionInformacion";


export default function CalificarExperiencia() {
    return (
        <>
        <section className="recuadro-experiencia">
            <br />
            <CalificacionInformacion texto={"Percepcion general del servicio"}></CalificacionInformacion>
            <br />

            <RecuadroEncuesta texto="Cual fue tu experiencia"></RecuadroEncuesta>
            <br />
            <CalificacionInformacion texto={"Amabilidad y atencion"}></CalificacionInformacion>
            <br /> 

            <RecuadroEncuesta texto="¿Se te atendio con amabilidad y cortesia?"></RecuadroEncuesta>
            
            <br />
            <CalificacionInformacion texto={"Calidad del producto"}></CalificacionInformacion>
            <br />

            <RecuadroEncuesta texto="¿Que producto consumiste mas?"></RecuadroEncuesta>

            <br /><CalificacionInformacion texto={"Agilidad en tu pedido"}></CalificacionInformacion>
            <br />

            <RecuadroEncuesta texto="En cuanto tiempo recbiste el pedido?¿Te parecio adecuado el tiempo?"></RecuadroEncuesta>

            <br />
            <br />  
        </section>
        <div>
            <Link to="/Recomendacion">
             <button className="boton-siguiente ">Siguiente</button>
             </Link>
           
        </div>
            </>
        
    )
}
