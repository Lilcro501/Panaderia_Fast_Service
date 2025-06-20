import React from "react";
import "../assets/styles/Experiencia.css"
import RecuadroEncuesta from "../components/CompoEncuesExperiencia"


export default function CalificarExperiencia() {
    return (
        <section className="recuadro-experiencia">
            <br />
            <br />

            <RecuadroEncuesta texto="Cual es tu opinion de la pagina"></RecuadroEncuesta>
            <br />
            <br /> 

            <RecuadroEncuesta texto="Que es lo que mas te gusto de la pagina"></RecuadroEncuesta>
            
            <br />
            <br />

            <RecuadroEncuesta texto="otra pergunta"></RecuadroEncuesta>

            <br />
            <br />

            <RecuadroEncuesta texto="otra pergunta"></RecuadroEncuesta>

            <br />
            <br />  

            <button>Siguiente</button>


        </section>
    )
}
